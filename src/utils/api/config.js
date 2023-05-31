export const CONTRACT_ADDRESS = '0x18aa04489921362f41879065c961b18956C8CBab';

export const ABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_brand",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_model",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_year",
				"type": "uint256"
			}
		],
		"name": "addCar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_client",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_carIndex",
				"type": "uint256"
			}
		],
		"name": "cancelRequest",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCar",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "brand",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "model",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "year",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "bool",
						"name": "inService",
						"type": "bool"
					},
					{
						"internalType": "address",
						"name": "dealer",
						"type": "address"
					}
				],
				"internalType": "struct AutoHoldingPlatform.Car[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getDealerByAddress",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "getDealers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "city",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "dealerAddress",
						"type": "address"
					}
				],
				"internalType": "struct AutoHoldingPlatform.Dealer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_carIndex",
				"type": "uint256"
			}
		],
		"name": "getServiceStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "inService",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "dealer",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_city",
				"type": "string"
			}
		],
		"name": "registerDealer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_dealer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_carIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "requestService",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]