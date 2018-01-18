'use strict';

//list of truckers
//useful for ALL 5 exercises
var truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from exercise 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];


function setReductionPrice() {
  deliveries.forEach(shipper => { 
    truckers.forEach(trucker => {
      if(trucker.id == shipper.truckerId)
      {
        //Step 1
        //shipper.price = shipper.distance*trucker.pricePerKm + shipper.volume*trucker.pricePerVolume;

        //Step 2
        if(shipper.volume > 25)
        {
          trucker.pricePerVolume = trucker.pricePerVolume*(0.5);
        }
        else if(shipper.volume > 10)
        {
          trucker.pricePerVolume = trucker.pricePerVolume*(0.7);
        }
        else if(shipper.volume > 5)
        {
          trucker.pricePerVolume = trucker.pricePerVolume*(0.9);
        }
        
        shipper.price = parseFloat(shipper.distance*trucker.pricePerKm + shipper.volume*trucker.pricePerVolume).toFixed(2);
      }
    });
  });
}

function setCommission() {
  //Step 3
  deliveries.forEach(shipper => { 
    var commission = shipper.price*0.3;
    shipper.commission.insurance = commission*0.5;
    shipper.commission.treasury = 1 + parseInt(shipper.distance / 500);
    shipper.commission.convargo = commission - shipper.commission.insurance - shipper.commission.treasury;
  });
}

function payDeductibleOption() {
  //Step 4
  deliveries.forEach(shipper => { 
    if(shipper.options.deductibleReduction == true)
    {
      shipper.price = parseFloat(shipper.price) + parseFloat(shipper.volume);
    }
  });
}

function payActors() {
  //Step 5
  deliveries.forEach(shipper => { 
    actors.forEach(actor => {
      truckers.forEach(trucker => {
        if(actor.deliveryId == shipper.id)
        {
          actor.payment.forEach(transaction => {
            if(transaction.who == "shipper")
            {
              transaction.amount = shipper.price; //shipping price + deductible option
            }
            if(transaction.who == "trucker")
            {
              if(shipper.options.deductibleReduction == false)
              {
                transaction.amount = shipper.price*0.7;
              }
              else
              {
                transaction.amount = (shipper.price - shipper.volume)*0.7;
              }
              
              //shipping price -30%
            }
            if(transaction.who == "insurance")
            {
              transaction.amount = shipper.commission.insurance;
            }
            if(transaction.who == "treasury")
            {
              transaction.amount = shipper.commission.treasury;
            }
            if(transaction.who == "convargo")
            {
              if(shipper.options.deductibleReduction == true)
              {
                transaction.amount = shipper.commission.convargo + shipper.volume;
              }
              else
              {
                transaction.amount = shipper.commission.convargo;
              }             
            } 
          });
        }
      });
    });
  });
}


setReductionPrice();
setCommission();
payDeductibleOption();
payActors();

console.log(truckers);
console.log(deliveries);
console.log(actors);