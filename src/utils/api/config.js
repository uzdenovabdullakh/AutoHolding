export const CONTRACT_ADDRESS = '0x1C4CcA79D600CdDdf1b1c4eb52211587172E7E76';

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
			}
		],
		"name": "requestService",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getServiceDealers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
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
	}
]