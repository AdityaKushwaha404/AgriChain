// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AgriTrace is AccessControl {
    bytes32 public constant FARMER_ROLE = keccak256("FARMER_ROLE");
    bytes32 public constant INSPECTOR_ROLE = keccak256("INSPECTOR_ROLE");
    bytes32 public constant DISTRIBUTOR_ROLE = keccak256("DISTRIBUTOR_ROLE");
    bytes32 public constant RETAILER_ROLE = keccak256("RETAILER_ROLE");
    mapping(string => uint256) public pendingPayments;
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }
    enum Status { Created, Packed, InTransit, Arrived, QualityChecked, Sold, Disputed }

    struct Transfer {
        address from;
        address to;
        uint256 timestamp;
        string noteCID;
    }

    struct QualityEvent {
        address inspector;
        uint256 timestamp;
        string reportCID;
        bool passed;
        string notes;
    }

    struct PriceRecord {
        address setter;
        uint256 priceWei;
        uint256 timestamp;
        string noteCID;
    }

    struct Batch {
        string batchId;
        address producer;
        string originGeo;
        uint256 createdAt;
        Status status;
        string productType;
        uint256 quantity;
        string metadataCID;
        Transfer[] transfers;
        QualityEvent[] qualityEvents;
        PriceRecord[] prices;
    }

    mapping(string => Batch) private batches;
    mapping(string => bool) public exists;

    event BatchCreated(string batchId, address producer);
    event TransferRecorded(string batchId, address from, address to);
    event QualityRecorded(string batchId, address inspector, bool passed);
    event PricePosted(string batchId, uint256 priceWei);
    event Sold(string batchId, address buyer, uint256 priceWei);

    modifier onlyProducer(string memory batchId) {
        require(exists[batchId], "onlyProducer: Batch does not exist");
        require(batches[batchId].producer == msg.sender, "onlyProducer: Caller is not the producer");
        _;
    }

    function createBatch(
        string calldata batchId,
        string calldata originGeo,
        string calldata productType,
        uint256 quantity,
        string calldata metadataCID
    ) external onlyRole(FARMER_ROLE) {
    require(!exists[batchId], "createBatch: Batch already exists");
        Batch storage b = batches[batchId];
        b.batchId = batchId;
        b.producer = msg.sender;
        b.originGeo = originGeo;
        b.productType = productType;
        b.quantity = quantity;
        b.metadataCID = metadataCID;
        b.createdAt = block.timestamp;
        b.status = Status.Created;
        exists[batchId] = true;
        emit BatchCreated(batchId, msg.sender);
    }

    function recordTransfer(string calldata batchId, address to, string calldata noteCID) external payable {
        require(exists[batchId], "recordTransfer: Batch does not exist");
        Batch storage b = batches[batchId];
        address prevOwner = (b.transfers.length == 0) ? b.producer : b.transfers[b.transfers.length-1].to;
        require(msg.sender == prevOwner, "recordTransfer: Caller is not the current owner");
        uint256 price = pendingPayments[batchId];
        if (price > 0) {
            require(msg.value >= price, "recordTransfer: Insufficient payment sent");
            payable(prevOwner).transfer(price);
            if (msg.value > price) {
                payable(msg.sender).transfer(msg.value - price);
            }
            pendingPayments[batchId] = 0;
        }
        b.transfers.push(Transfer({from: msg.sender, to: to, timestamp: block.timestamp, noteCID: noteCID}));
        b.status = Status.InTransit;
        emit TransferRecorded(batchId, msg.sender, to);
    }

    function recordArrival(string calldata batchId) external {
        require(exists[batchId], "recordArrival: Batch does not exist");
        Batch storage b = batches[batchId];
        address currentOwner = (b.transfers.length == 0) ? b.producer : b.transfers[b.transfers.length-1].to;
        require(msg.sender == currentOwner, "recordArrival: Caller is not the current owner");
        b.status = Status.Arrived;
    }

    function postPrice(string calldata batchId, uint256 priceWei, string calldata noteCID) external onlyRole(DISTRIBUTOR_ROLE) {
        require(exists[batchId], "postPrice: Batch does not exist");
        Batch storage b = batches[batchId];
        b.prices.push(PriceRecord({setter: msg.sender, priceWei: priceWei, timestamp: block.timestamp, noteCID: noteCID}));
        pendingPayments[batchId] = priceWei;
        emit PricePosted(batchId, priceWei);
    }

    function acceptPriceAndBuy(string calldata batchId, uint256 priceIndex) external payable {
        require(exists[batchId], "acceptPriceAndBuy: Batch does not exist");
        Batch storage b = batches[batchId];
        require(priceIndex < b.prices.length, "acceptPriceAndBuy: Invalid price index");
        PriceRecord memory pr = b.prices[priceIndex];
        require(msg.value == pr.priceWei, "acceptPriceAndBuy: Must send exact price amount");
        payable(pr.setter).transfer(msg.value);
        b.transfers.push(Transfer({from: pr.setter, to: msg.sender, timestamp: block.timestamp, noteCID: ""}));
        b.status = Status.Sold;
        emit Sold(batchId, msg.sender, pr.priceWei);
    }

    function recordQualityEvent(string calldata batchId, bool passed, string calldata reportCID, string calldata notes) external onlyRole(INSPECTOR_ROLE) {
        require(exists[batchId], "recordQualityEvent: Batch does not exist");
        Batch storage b = batches[batchId];
        b.qualityEvents.push(QualityEvent({inspector: msg.sender, timestamp: block.timestamp, reportCID: reportCID, passed: passed, notes: notes}));
        if(passed) {
            b.status = Status.QualityChecked;
        } else {
            b.status = Status.Disputed;
        }
        emit QualityRecorded(batchId, msg.sender, passed);
    }
    // --- Traceability View Functions ---
    function getBatch(string calldata batchId) external view returns (
        string memory,
        address,
        string memory,
        uint256,
        uint8,
        string memory,
        uint256
    ) {
        Batch storage b = batches[batchId];
        return (
            b.batchId,
            b.producer,
            b.originGeo,
            b.createdAt,
            uint8(b.status),
            b.productType,
            b.quantity
        );
    }

    function getTransfers(string calldata batchId) external view returns (
        Transfer[] memory
    ) {
        return batches[batchId].transfers;
    }

    function getQualityEvents(string calldata batchId) external view returns (
        QualityEvent[] memory
    ) {
        return batches[batchId].qualityEvents;
    }

    function getPrices(string calldata batchId) external view returns (
        PriceRecord[] memory
    ) {
        return batches[batchId].prices;
    }
}