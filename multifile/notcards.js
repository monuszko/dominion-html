const existing_notcards = JSON.parse(`
[
    {
        "complicated": false,
        "cost": 5,
        "types": ["event"],
        "name": "Summon",
        "set": "promos",
        "tags": ["gainer"],
        "text": "Gain an Action card costing up to 4 Coin. Set it aside. If you do, then at the start of your next turn, play it."
    },
    {
        "complicated": false,
        "cost": 0,
        "types": ["event"],
        "name": "Alms",
        "set": "adventures",
        "tags": ["gainer"],
        "text": "Once per turn: If you have no Treasures in play, gain a card costing up to 4 Coin."
    },
    {
        "complicated": false,
        "cost": 0,
        "types": ["event"],
        "name": "Borrow",
        "set": "adventures",
        "tags": ["virtual_coin"],
        "text": "Once per turn: If your -1 Card token isn't on your deck, put it there and +1 Coin. "
    },
    {
        "complicated": false,
        "cost": 0,
        "types": ["event"],
        "name": "Quest",
        "set": "adventures",
        "tags": ["gainer"],
        "text": "You may discard an Attack, two Curses, or six cards. If you do, gain a Gold."
    },
    {
        "complicated": false,
        "cost": 1,
        "types": ["event"],
        "name": "Save",
        "set": "adventures",
        "tags": [],
        "text": "Once per turn: Set aside a card from your hand, and put it into your hand at the end of turn (after drawing)."
    },
    {
        "complicated": false,
        "cost": 2,
        "types": ["event"],
        "name": "Scouting Party",
        "set": "adventures",
        "tags": ["sifter"],
        "text": "+1 Buy\\n\\nLook at the top 5 cards of your deck. Discard 3 of them and put the rest back in any order."
    },
    {
        "complicated": false,
        "cost": 2,
        "types": ["event"],
        "name": "Travelling Fair",
        "set": "adventures",
        "tags": [],
        "text": "+2 Buy\\n\\nWhen you gain a card this turn, you may put it on top of your deck."
    },
    {
        "complicated": false,
        "cost": 3,
        "types": ["event"],
        "name": "Bonfire",
        "set": "adventures",
        "tags": ["early_trasher"],
        "text": "Trash up to 2 cards you have in play."
    },
    {
        "complicated": false,
        "cost": 3,
        "types": ["event"],
        "name": "Expedition",
        "set": "adventures",
        "tags": [],
        "text": "Draw 2 extra cards for your next hand."
    },
    {
        "complicated": false,
        "cost": 3,
        "types": ["event"],
        "name": "Ferry",
        "set": "adventures",
        "tags": [],
        "text": "Move your -2 Coin cost token to an Action Supply pile (cards from that pile cost 2 less on your turns, but not less than 0)."
    },
    {
        "complicated": false,
        "cost": 3,
        "types": ["event"],
        "name": "Plan",
        "set": "adventures",
        "tags": [],
        "text": "Move your Trashing token to an Action Supply pile (when you buy a card from that pile, you may trash a card from your hand.)"
    },
    {
        "complicated": false,
        "cost": 4,
        "types": ["event"],
        "name": "Mission",
        "set": "adventures",
        "tags": [],
        "text": "Once per turn: If the previous turn wasn't yours, take another turn after this one, in which you can't buy cards."
    },
    {
        "complicated": true,
        "cost": 4,
        "types": ["event"],
        "name": "Pilgrimage",
        "set": "adventures",
        "tags": ["gainer"],
        "text": "Once per turn: Turn your Journey token over (it starts face up); then if it is face up, choose up to 3 differently named cards you have in play and gain a copy of each."
    },
    {
        "complicated": false,
        "cost": 5,
        "types": ["event"],
        "name": "Ball",
        "set": "adventures",
        "tags": ["gainer"],
        "text": "Take your -1 Coin token. Gain 2 cards costing up to 4 Coin."
    },
    {
        "complicated": false,
        "cost": 5,
        "types": ["event"],
        "name": "Raid",
        "set": "adventures",
        "tags": ["gainer"],
        "text": "Gain a Silver per Silver you have in play. Each other player puts his -1 Card token on his deck."
    },
    {
        "complicated": false,
        "cost": 5,
        "types": ["event"],
        "name": "Seaway",
        "set": "adventures",
        "tags": ["gainer"],
        "text": "Gain an Action card costing up to 4 Coin. Move your +1 Buy token to its pile (when you play a card from that pile, you first get +1 Buy)."
    },
    {
        "complicated": false,
        "cost": 5,
        "types": ["event"],
        "name": "Trade",
        "set": "adventures",
        "tags": ["gainer"],
        "text": "Trash up to 2 cards from your hand. Gain a Silver per card you trashed."
    },
    {
        "complicated": false,
        "cost": 6,
        "types": ["event"],
        "name": "Lost Arts",
        "set": "adventures",
        "tags": [],
        "text": "Move your +1 Action token to an Action Supply pile (when you play a card from that pile, you first get +1 Action)."
    },
    {
        "complicated": false,
        "cost": 6,
        "types": ["event"],
        "name": "Training",
        "set": "adventures",
        "tags": ["virtual_coin"],
        "text": "Move your +1 Coin token to an Action Supply pile (when you play a card from that pile, you first get +1 Coin)."
    },
    {
        "complicated": false,
        "cost": 7,
        "types": ["event"],
        "name": "Inheritance",
        "set": "adventures",
        "tags": [],
        "text": "Once per game: Set aside a non-Victory Action card from the Supply costing up to 4 Coin. Move your Estate token to it (your Estates gain the abilities and types of that card)."
    },
    {
        "complicated": false,
        "cost": 8,
        "types": ["event"],
        "name": "Pathfinding",
        "set": "adventures",
        "tags": [],
        "text": "Move your +1 Card token to an Action Supply pile (when you play card from that pile, you first get +1 Card)."
    },
    {
        "complicated": false,
        "cost": 0,
        "types": ["event"],
        "name": "Advance",
        "set": "empires",
        "tags": [],
        "text": "You may trash an Action card from your hand. If you do, gain an Action card costing up to 6 Coin."
    },
    {
        "complicated": false,
        "cost": 2,
        "types": ["event"],
        "name": "Delve",
        "set": "empires",
        "tags": [],
        "text": "+1 Buy\\n\\nGain a Silver."
    },
    {
        "complicated": false,
        "cost": 2,
        "types": ["event"],
        "name": "Tax",
        "set": "empires",
        "tags": [],
        "text": "Add 2 Debt to Supply pile.\\n\\n\\nSetup: add 1 Debt to each Supply pile. When a player buys a card, they take the Debt from its pile."
    },
    {
        "complicated": false,
        "cost": 4,
        "types": ["event"],
        "name": "Ritual",
        "set": "empires",
        "tags": [],
        "text": "Gain a Curse. If you do, trash a card from your hand. +1 Victory per 1 Coin it cost."
    },
    {
        "complicated": false,
        "cost": 4,
        "types": ["event"],
        "name": "Salt the earth",
        "set": "empires",
        "tags": [],
        "text": "+1 Victory.\\n\\nTrash a Victory card from the Supply."
    },
    {
        "complicated": false,
        "cost": 5,
        "types": ["event"],
        "name": "Windfall",
        "set": "empires",
        "tags": [],
        "text": "If your deck and discard pile are empty, gain 3 Golds."
    },
    {
        "complicated": false,
        "cost": 6,
        "types": ["event"],
        "name": "Conquest",
        "set": "empires",
        "tags": [],
        "text": "Gain 2 Silvers. +1 Victory per Silver you've gained this turn."
    },
    {
        "complicated": false,
        "cost": 14,
        "types": ["event"],
        "name": "Dominate",
        "set": "empires",
        "tags": [],
        "text": "Gain a Province. If you do, +9 Victory."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Aqueduct",
        "set": "empires",
        "tags": [],
        "text": "When you gain a Treasure, move 1 Victory from its pile to this. When you gain a Victory card, take the Victory from this.\\n\\n\\nSetup: Put 8 Victory on the Silver and Gold piles."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Arena",
        "set": "empires",
        "tags": [],
        "text": "At the start of your Buy phase, you may discard an Action card. If you do, take 2 Victory from here.\\n\\n\\nSetup: Put 6 Victory here per player."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Bandit Fort",
        "set": "empires",
        "tags": [],
        "text": "When scoring, -2 Victory for each Silver and each Gold you have."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Basilica",
        "set": "empires",
        "tags": [],
        "text": "When you buy a card, if you have 2 Coin or more left, take 2 Victory from here.\\n\\n\\nSetup: Put 6 Victory here per player."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Baths",
        "set": "empires",
        "tags": [],
        "text": "When you end your turn without having gained a card, take 2 Victory from here.\\n\\n\\nSetup: Put 6 Victory here per player."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Baths",
        "set": "empires",
        "tags": [],
        "text": "When you end your turn without having gained a card, take 2 Victory from here.\\n\\n\\nSetup: Put 6 Victory here per player."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Battlefield",
        "set": "empires",
        "tags": [],
        "text": "When you gain a Victory card, take 2 Victory from here.\\n\\n\\nSetup: Put 6 Victory here per player."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Colonnade",
        "set": "empires",
        "tags": [],
        "text": "When you buy an Action card, if you have a copy of it in play, take 2 Victory from here.\\n\\n\\nSetup: Put 6 Victory here per player."
    },
    {
        "complicated": true,
        "types": ["landmark"],
        "name": "Defiled Shrine",
        "set": "empires",
        "tags": [],
        "text": "When you gain an Action, move 1 Victory from its pile to this. When you buy a Curse, take the Victory from this.\\n\\n\\nSetup: Put 2 Victory on each non-Gathering Action Supply pile."
    },
    {
        "complicated": true,
        "types": ["landmark"],
        "name": "Defiled Shrine",
        "set": "empires",
        "tags": [],
        "text": "When you gain an Action, move 1 Victory from its pile to this. When you buy a Curse, take the Victory from this.\\n\\n\\nSetup: Put 2 Victory on each non-Gathering Action Supply pile."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Fountain",
        "set": "empires",
        "tags": [],
        "text": "When scoring, 15 Victory if you have at least 10 Coppers."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Keep",
        "set": "empires",
        "tags": [],
        "text": "When scoring, 5 Victory per differently named Treasure you have, that you have more copies of than each other player, or tied for most."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Labyrinth",
        "set": "empires",
        "tags": [],
        "text": "When you gain a 2nd card in one of your turns, take 2 Victory from here.\\n\\n\\nSetup: Put 6 Victory here per player."
    },
    {
        "complicated": true,
        "types": ["landmark"],
        "name": "Mountain Pass",
        "set": "empires",
        "tags": [],
        "text": "When you are the first player to gain a Province, after this turn, each player bids once, up to 40 Debt, ending with you. High bidder gets +8 Victory and takes the Debt they bid."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Museum",
        "set": "empires",
        "tags": [],
        "text": "When scoring, 2 Victory per differently named card you have."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Obelisk",
        "set": "empires",
        "tags": [],
        "text": "When scoring, 2 Victory per card you have from the chosen pile.\\n\\n\\nSetup: Choose a random Action supply pile."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Orchard",
        "set": "empires",
        "tags": [],
        "text": "When scoring, 4 Victory per differently named Action card you have 3 or more copies of."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Palace",
        "set": "empires",
        "tags": [],
        "text": "When scoring, 3 Victory per set you have of Copper - Silver - Gold."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Tomb",
        "set": "empires",
        "tags": [],
        "text": "When you trash a card, +1 Victory."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Tower",
        "set": "empires",
        "tags": [],
        "text": "When scoring, 1 Victory per non-Victory card you have from an empty Supply pile."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Triumphal Arch",
        "set": "empires",
        "tags": [],
        "text": "When scoring, 3 Victory per copy you have of the 2nd most common Action card among your cards (if it's a tie, count either)."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Wall",
        "set": "empires",
        "tags": [],
        "text": "When scoring, -1 Victory per card you have after the first 15."
    },
    {
        "complicated": false,
        "types": ["landmark"],
        "name": "Wolf Den",
        "set": "empires",
        "tags": [],
        "text": "When scoring, -3 Victory per card you have exactly one copy of."
    },
    {
        "complicated": false,
        "cost": 0,
        "debt": 5,
        "types": ["event"],
        "name": "Triumph",
        "set": "empires",
        "tags": [],
        "text": "Gain an Estate. If you did, +1 Victory per card you've gained this turn."
    },
    {
        "complicated": false,
        "cost": 0,
        "debt": 8,
        "types": ["event"],
        "name": "Annex",
        "set": "empires",
        "tags": [],
        "text": "Look through your discard pile. Shuffle all but up to 5 cards from it into your deck. Gain a Duchy."
    },
    {
        "complicated": true,
        "cost": 0,
        "debt": 8,
        "types": ["event"],
        "name": "Donate",
        "set": "empires",
        "tags": [],
        "text": "After this turn, put all cards from your deck and discard pile into your hand, trash any number, shuffle your hand into your deck, then draw 5 cards."
    },
    {
        "complicated": false,
        "cost": 4,
        "debt": 3,
        "types": ["event"],
        "name": "Wedding",
        "set": "empires",
        "tags": [],
        "text": "+1 Victory\\n\\nGain a Gold."
    }
]
`);
