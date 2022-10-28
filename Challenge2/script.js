class AuctionUtils {
    static compareGeneralizedScondPriceAuction(bidder_1, bidder_2) {
        if (bidder_1.amount === bidder_2.amount) {
            return (bidder_1.name < bidder_2.name ? -1 : (bidder_1.name === bidder_2.name ? 0 : 1));
        }
        return (bidder_1.amount > bidder_2.amount ? -1 : 1);
    }
    static groupBids(bids) {
        bids.sort(function (bidder_1, bidder_2) {
            return (bidder_1.name < bidder_2.name ? -1 : (bidder_1.name === bidder_2.name ? 0 : 1));
        });
        let res = [];
        for (let i = 0; i < bids.length; ++i) {
            let j = i + 1;
            let sum = bids[i].amount;
            while (j < bids.length && bids[j].name === bids[i].name)
                sum = sum + bids[j].amount, j++;
            res.push(new Bidder(bids[i].name, sum));
            i = j - 1;
        }
        bids = [];
        return res;
    }
}

class Bidder {
    constructor(name = 'No name', amount = 0) {
        this._name = name;
        this._amount = amount;
    }
    get name() {
        return this._name;
    }
    get amount() {
        return this._amount;
    }
}
class Auction {
    constructor(items = 0) {
        if (items <= 0)
            throw new Error('To start an auction, you need positive number of items.');
        this._bids = [];
        this._items = items;
    }
    get bidsCount() {
        return this._bids.length;
    }
    get itemsCount() {
        return this._items;
    }
    get bids() {
        return this._bids;
    }
    addBid(bidder) {
        this._bids.push(bidder);
    }
    // validates if the auction in a valid state or not i.e(bidders# > items)
    validateAuctionState(numberOfBids, numberOfItems) {
        if (numberOfBids <= numberOfItems)
            throw new Error('Number of bids must be greater than the number of items to start an auction.');
    }
    showAuctionResults(res) {
        console.log('User' + '\t\t\t' + 'Paid in USD');
        res.forEach((bidder) => {
            console.log(bidder.name + '\t\t' + bidder.amount);
        });
    }

}
class GeneralizedScondPriceAuction extends Auction {
    constructor(items = 0) {
        super(items);
    }
    calculateAuctionResults() {

        if (this.bidsCount === 0) {
            console.log("No Winner");
            return "No Winner";
        }
        this._bids = AuctionUtils.groupBids(this._bids);
        this.validateAuctionState(this.bidsCount, this.itemsCount)
        this.bids.sort(AuctionUtils.compareGeneralizedScondPriceAuction);
        let res = [];
        let name = null, newAmount = null, state = 'LOST';

        // it's garunteed that the number of bidders is more than the numbef or items
        // Winners of the auctions
        for (let i = 0; i < this._items; ++i) {
            name = this.bids[i].name;
            newAmount = this.bids[i + 1].amount;
            res.push(new Bidder(name, newAmount));
        }
        // People who lost.
        for (let i = this._items; i < this.bidsCount; ++i) {
            name = this._bids[i].name;
            res.push(new Bidder(name, state));
        }
        this.showAuctionResults(res);
        return res;
    }

}

try {
    let auction1 = new GeneralizedScondPriceAuction(3);
    auction1.addBid(new Bidder('John Doe', 100));
    auction1.addBid(new Bidder('John Smith', 500));
    auction1.addBid(new Bidder('Sara Conor', 280));
    auction1.addBid(new Bidder('John Smith', 5030));
    auction1.addBid(new Bidder('John Smith', 5014));
    auction1.addBid(new Bidder('John Smith', 5014));
    auction1.addBid(new Bidder('Martin Fowler', 320));
    let res_1 = auction1.calculateAuctionResults();
} catch (error) {
    console.error({ error: error.message });
}
try {
    let auction2 = new GeneralizedScondPriceAuction(0); // Expected Error
} catch (error) {
    console.error({ error: error.message });
}
try {
    let auction3 = new GeneralizedScondPriceAuction(1);
    auction3.addBid(new Bidder('John Doe', 100));
    auction3.calculateAuctionResults();  // Expected Error
} catch (error) {
    console.error({ error: error.message });
}
try {
    let auction4 = new GeneralizedScondPriceAuction(1);
    let res = auction4.calculateAuctionResults();
} catch (error) {
    console.error({ error: error });
}

