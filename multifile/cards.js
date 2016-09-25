// This file contains card data in JSON-like javascript.
//
// Chrome won't let cross-origin requests (for local 'cards.json' file) without
// an extension. This means getting 'cards.json' via XMLHttpRequest, especially
// synchronous request, wouldn't work.
//
// the trick with backticks `` is Template Strings / NoSubstitutionTemplate,
// from EcmaScript6.
//
const existing_cards = JSON.parse(`
[
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Envoy",
        "set": "promos",
        "tags": [
        ],
        "text": "Reveal the top 5 cards of your deck. The player to your left chooses one for you to discard. Draw the rest.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 3,
        "name": "Black Market",
        "set": "promos",
        "tags": [
            "virtual_coin"
        ],
        "text": "+2 Coin\\n\\nReveal the top 3 cards of the Black Market deck. You may buy one of them immediately. But the unbought cards at the bottom of the Black Market deck in any order.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 2,
        "name": "Stash",
        "set": "promos",
        "tags": [
        ],
        "text": "2 Coin\\n\\n\\nWhen you shuffle, you may put this anywhere in your deck.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Walled Village",
        "set": "promos",
        "tags": [
        ],
        "text": "+1 Card\\n+2 Actions\\n\\nAt the start of Clean-up, if you have this and no more than one other Action in play, you may put this on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "name": "Governor",
        "set": "promos",
        "tags": [
            "gainer"
        ],
        "text": "+1 Action\\n\\nChoose one; you get the version in parentheses: Each player gets +1 (+3) Cards; or each player gains a Silver (Gold), or each player may trash a card from his hand and gain a card costing exactly 1 Coin (2 Coin) more.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 8,
        "name": "Prince",
        "set": "promos",
        "tags": [
        ],
        "text": "You may set this aside. If you do, set aside an Action from your hand costing up to 4 Coin. At the start of each of your turns, play that Action, setting it aside again when you discard it from play. (Stop playing it if you fail to set it aside on a turn you play it.)",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "name": "Amulet",
        "set": "adventures",
        "tags": [
            "mass_trasher",
            "virtual_coin",
            "silver_generator"
        ],
        "text": "Now and at the start of your next turn, choose one: +1 Coin; or trash a card from your hand; or gain a Silver.",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Artificer",
        "set": "adventures",
        "tags": [
            "gainer"
        ],
        "text": "+1 Card\\n+1 Action\\n+1 Coin\\n\\nDiscard any number of cards. You may gain a card costing exactly 1 Coin per card discarded, putting it on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "gainer"
        ],
        "name": "Bridge Troll",
        "set": "adventures",
        "tags": [
            "virtual_coin"
        ],
        "text": "Each other player takes his -1 Coin token. Now and at the start of your next turn: +1 Buy.\\n\\n\\nWhile this is in play, cards cost 1 Coin less on your turn, but not less than 0 Coin.",
        "types": [
            "Action",
            "Attack",
            "Duration"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "name": "Caravan Guard",
        "set": "adventures",
        "tags": [
            "needs_attacks",
            "virtual_coin"
        ],
        "text": "+1 Card\\n+1 Action\\nAt the start of your next turn, +1 Coin.\\n\\n\\nWhen another player plays an Attack card, you may play this from your hand. (+1 Action has no effect if it's not your turn.)",
        "types": [
            "Action",
            "Duration",
            "Reaction"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 2,
        "name": "Coin of the Realm",
        "set": "adventures",
        "tags": [],
        "text": "1 Coin\\n\\nWhen you play this, put it on your Tavern mat.\\n\\n\\nDirectly after resolving an Action, you may call this, for +2 Actions.",
        "types": [
            "Treasure",
            "Reserve"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Distant Lands",
        "set": "adventures",
        "tags": [],
        "text": "Put this on your Tavern mat.\\n\\n\\nWorth 4 Victory if on your Tavern mat at the end of the game (otherwise worth 0 Victory).",
        "types": [
            "Action",
            "Reserve",
            "Victory"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "name": "Dungeon",
        "set": "adventures",
        "tags": [
            "sifter"
        ],
        "text": "+1 Action\\n\\nNow and at the start of your next turn: +2 Cards, then discard 2 cards.",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Duplicate",
        "set": "adventures",
        "tags": [
            "gainer"
        ],
        "text": "Put this on your Tavern mat.\\n\\n\\nWhen you gain a card costing up to 6 Coin, you may call this, to gain a copy of that card.",
        "types": [
            "Action",
            "Reserve"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "name": "Gear",
        "set": "adventures",
        "tags": [],
        "text": "+2 Cards\\n\\nSet aside up to 2 cards from your hand face down. At the start of your next turn, put them into your hand.",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "countered_by": [
            "trasher",
            "likes_being_trashed",
            "spam_filter"
        ],
        "name": "Giant",
        "set": "adventures",
        "tags": [
            "junk_attack",
            "virtual_coin"
        ],
        "text": "Turn over your Journey token (it starts face up). If it's face down, +1 Coin. If it's face up, +5 Coin and each other player reveals the top card of his deck, trashes it if it costs from 3 Coin to 6 Coin, and otherwise discards it and gains a Curse.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "name": "Guide",
        "set": "adventures",
        "tags": [
            "draw_to_x",
            "deck_inspector"
        ],
        "text": "+1 Card\\n+1 Action\\nPut this on your Tavern mat.\\n\\n\\nAt the start of your next turn, you may call this, to discard your hand and draw 5 cards.",
        "types": [
            "Action",
            "Reserve"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "countered_by": [
            "gainer",
            "trasher",
            "trash_for_benefit"
        ],
        "name": "Haunted Woods",
        "set": "adventures",
        "tags": [],
        "text": "Until your next turn, when any other player buys a card, he puts his hand on top of his deck in any order.\\nAt the start of your next turn:\\n+3 Cards.",
        "types": [
            "Action",
            "Duration",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 6,
        "name": "Hireling",
        "set": "adventures",
        "tags": [],
        "text": "At the start of each of your turns for the rest of the game:\\n+1 Card\\n(this stays in play.)",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 5,
        "name": "Lost City",
        "set": "adventures",
        "tags": [],
        "text": "+2 Cards\\n+2 Actions\\n\\n\\nWhen you gain this, each other player draws a card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Magpie",
        "set": "adventures",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\n\\nReveal the top card of your deck. If it's a Treasure, put it into your hand. If it's an Action or Victory card, gain a Magpie.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 4,
        "name": "Messenger",
        "set": "adventures",
        "tags": [
            "virtual_coin",
            "gainer"
        ],
        "text": "+1 Buy\\n+2 Coin\\n\\nYou may put your deck into your discard pile.\\n\\n\\nWhen this is your first buy in a turn, gain a card costing up to 4 Coin, and each other player gains a copy of it.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Miser",
        "set": "adventures",
        "tags": [
            "early_trasher",
            "virtual_coin"
        ],
        "text": "Choose one: Put a Copper from your hand onto your Tavern mat; or +1 per Copper on your Tavern mat.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 2,
        "name": "Page",
        "set": "adventures",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\n\\nWhen you discard this from play, you may exchange it for a Treasure Hunter.",
        "types": [
            "Action",
            "Traveller"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 2,
        "name": "Peasant",
        "set": "adventures",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Buy\\n+1 Coin\\n\\n\\nWhen you discard this from play, you may exchange it for a Soldier.",
        "types": [
            "Action",
            "Traveller"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Port",
        "set": "adventures",
        "tags": [],
        "text": "+1 Card\\n+2 Actions\\n\\n\\nWhen you buy this, gain another Port.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Ranger",
        "set": "adventures",
        "tags": [],
        "text": "+1 Buy\\n\\nTurn your Journey token over (it starts face up). If it's face up, +5 Cards.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "name": "Ratcatcher",
        "set": "adventures",
        "tags": [
            "trasher"
        ],
        "text": "+1 Card\\n+1 Action\\nPut this on your Tavern mat.\\n\\n\\nAt the start of your turn, you may call this, to trash a card from your hand.",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "name": "Raze",
        "set": "adventures",
        "tags": [
            "trash_for_benefit",
            "trasher"
        ],
        "text": "+1 Action\\n\\nTrash this or a card from your hand. Look at the number of cards from the top of your deck equal to the cost in Coins of the trashed card. Put one into your hand and discard the rest.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "draw_to_x",
            "steals_treasure",
            "treasure_trasher"
        ],
        "name": "Relic",
        "set": "adventures",
        "tags": [
            "handsize_attack"
        ],
        "text": "2 Coin\\n\\nWhen you play this, each other player puts his -1 Card token on his deck.",
        "types": [
            "Treasure",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Royal Carriage",
        "set": "adventures",
        "tags": [],
        "text": "+1 Action\\nPut this on your tavern mat.\\n\\n\\nDirectly after resolving an Action, if it's still in play, you may call this, to replay that Action.",
        "types": [
            "Action",
            "Reserve"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 5,
        "name": "Storyteller",
        "set": "adventures",
        "tags": [],
        "text": "+1 Action\\n+1 Coin\\n\\nPlay up to 3 Treasures from your hand. Pay all of your Coins; +1 Card per Coin paid.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "gainer",
            "spam_filter",
            "virtual_coin"
        ],
        "name": "Swamp Hag",
        "set": "adventures",
        "tags": [
            "junk_attack"
        ],
        "text": "Until your next turn, when any other player buys a card, he gains a Curse.\\nAt the start of your next turn, +3 Coin\\n.",
        "types": [
            "Action",
            "Duration",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Transmogrify",
        "set": "adventures",
        "tags": [
            "trash_for_benefit"
        ],
        "text": "+1 Action\\nPut this on your Tavern mat.\\n\\n\\nAt the start of your turn, you may call this, to trash a card from your hand, gain a card costing up to 1 Coin more than it, and put that card into your hand.",
        "types": [
            "Action",
            "Reserve"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Treasure Trove",
        "set": "adventures",
        "tags": [],
        "text": "2 Coin\\n\\nWhen you play this, gain a Gold and a Copper.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Wine Merchant",
        "set": "adventures",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Buy\\n+4 Coin\\nPut this on your Tavern mat.\\n\\n\\nAt the end of your Buy phase, if you have at least 2 Coin unspent, you may discard this from your Tavern mat.",
        "types": [
            "Action",
            "Reserve"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "potion": true,
        "name": "Alchemist",
        "set": "alchemy",
        "tags": [],
        "text": "+2 Cards\\n+1 Action\\n\\n\\nWhen you discard this from play, you may put this on top of your deck if you have a Potion in play.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "potion": true,
        "name": "Apothecary",
        "set": "alchemy",
        "tags": [
            "copper_strategy"
        ],
        "text": "+1 Card\\n+1 Action\\n\\nReveal the top 4 cards of your deck. Put the revealed Coppers and Potions into your hand. Put the other cards back on top of your deck in any order.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 5,
        "name": "Apprentice",
        "set": "alchemy",
        "tags": [
            "trash_for_benefit"
        ],
        "text": "+1 Action\\n\\nTrash a card from your hand. +1 Card per Coins it costs. +2 cards if it has Potion in its cost.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "potion": true,
        "countered_by": [
            "trasher",
            "mass_trasher",
            "spam_filter"
        ],
        "name": "Familiar",
        "set": "alchemy",
        "tags": [
            "mass_trasher",
            "trasher"
        ],
        "text": "+1 Card\\n+1 Action\\n\\nEach other player gains a Curse.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "potion": true,
        "name": "Golem",
        "set": "alchemy",
        "tags": [],
        "text": "Reveal cards from your deck until you reveal 2 Action cards other than Golem cards. Discard other cards, then play the Action cards in either order.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 2,
        "name": "Herbalist",
        "set": "alchemy",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Buy\\n+1 Coin\\n\\n\\nWhen you discard this from play, you may put one of your Treasures from play on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "potion": true,
        "name": "Philosopher's Stone",
        "set": "alchemy",
        "tags": [],
        "text": "When you play this, count your deck and discard pile. Worth 1 per 5 cards total between them (rounded down).",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 6,
        "potion": true,
        "name": "Possession",
        "set": "alchemy",
        "tags": [],
        "text": "The player to your left takes an extra turn after this one, in which you can see all cards he can and make all decisions for him. Any cards he would gain on that turn, you gain instead; any cards of his that are trashed are set aside and returned to his discard pile at end of turn.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 2,
        "potion": true,
        "countered_by": [
            "sifter",
            "deck_inspector"
        ],
        "name": "Scrying Pool",
        "set": "alchemy",
        "tags": [
            "sifter"
        ],
        "text": "+1 Action\\n\\nEach player (including you) reveals the top card of his deck and either discards it or puts it back, your choice. Then reveal cards from the top of your deck until you reveal one that isn't an Action. Put all your revealed cards into your hand.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 0,
        "potion": true,
        "name": "Transmute",
        "set": "alchemy",
        "tags": [
            "trash_for_benefit"
        ],
        "text": "Trash a card from your hand.\\nIf it's an...\\nAction card, gain a Duchy\\nTreasure card, gain a Transmute\\nVictory card, gain a Gold",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 2,
        "potion": true,
        "name": "University",
        "set": "alchemy",
        "tags": [
            "gainer"
        ],
        "text": "+2 Actions\\n\\nYou may gain an action card costing up to 5 Coins.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 0,
        "potion": true,
        "name": "Vineyard",
        "set": "alchemy",
        "tags": [
            "action_fetishist"
        ],
        "text": "Worth 1 Victory for every 3 Action cards in your deck (rounded down).",
        "types": [
            "Victory"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 6,
        "name": "Fairgrounds",
        "set": "cornucopia",
        "tags": [
            "likes_diversity"
        ],
        "text": "Worth 2 Victory for every 5 differently named cards in your deck (rounded down).",
        "types": [
            "Victory"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 4,
        "name": "Farming Village",
        "set": "cornucopia",
        "tags": [
            "sifter"
        ],
        "text": "+2 Actions\\n\\nReveal cards from the top of your deck until you reveal an Action or Treasure card. Put that card into your hand and discard the other cards.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "countered_by": [
            "sifter",
            "deck_inspector",
            "trasher",
            "mass_trasher"
        ],
        "name": "Fortune Teller",
        "set": "cornucopia",
        "tags": [
            "virtual_coin"
        ],
        "text": "+2 Coin\\n\\nEach other player reveals cards from the top of his deck until he reveals a Victory or Curse card. He puts it on the top and discards the other revealed cards.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "name": "Hamlet",
        "set": "cornucopia",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\n\\nYou may discard a card;\\nif you do, +1 Action.\\n\\nYou may discard a card;\\nif you do, +1 Buy.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "name": "Harvest",
        "set": "cornucopia",
        "tags": [
            "virtual_coin"
        ],
        "text": "Reveal the top 4 cards of your deck, then discard them. +1 Coin per differently named card revealed.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "name": "Horn of Plenty",
        "set": "cornucopia",
        "tags": [
            "likes_diversity",
            "gainer"
        ],
        "text": "0 Coin\\nWhen you play this, gain a card costing up to 1 Coin per differently named card you have in play, counting this. If it's a Victory card, trash this.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Horse Traders",
        "set": "cornucopia",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Buy\\n+3 Coin\\nDiscard 2 cards\\n\\n\\nWhen another player plays an Attack card, you may set this aside from your hand. If you do, then at the start of your next turn, +1 Card and return this to your hand.",
        "types": [
            "Action",
            "Reaction"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 5,
        "name": "Hunting Party",
        "set": "cornucopia",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\nReveal your hand. Reveal cards from your deck until you reveal a card that isn't a duplicate of one in your hand. Put it into your hand and discard the rest.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "countered_by": [
            "silver_generator",
            "copper_strategy",
            "spam_filter"
        ],
        "name": "Jester",
        "set": "cornucopia",
        "tags": [
            "junk_attack"
        ],
        "text": "+2 Coin\\n\\nEach other player discards the top card of his deck. If it's a Victory card, he gains a Curse. Otherwise either he gains a copy of the discarded card or you do, your choice.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 3,
        "name": "Menagerie",
        "set": "cornucopia",
        "tags": [
            "counters_handsize",
            "likes_diversity"
        ],
        "text": "+1 Card\\n\\nReveal your hand. If there are no duplicate cards in it, +3 Cards. Otherwise, +1 Card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Remake",
        "set": "cornucopia",
        "tags": [
            "mass_trasher"
        ],
        "text": "Do this twice: Trash a card from your hand, then gain a card costing exactly 1 Coin more than the trashed card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 4,
        "name": "Tournament",
        "set": "cornucopia",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Action\\n\\nEach player may reveal a Province from his hand.\\nIf you do, discard it and gain a Prize (from the Prize pile) or a Duchy, putting it on top of your deck.\\nIf no-one else does, +1 Card, +1 Coin.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 4,
        "countered_by": [
            "mass_trasher",
            "trasher",
            "spam_filter"
        ],
        "name": "Young Witch",
        "set": "cornucopia",
        "tags": [
            "junk_attack"
        ],
        "text": "+2 Cards\\n\\nDiscard 2 cards. Each other player may reveal a Bane card from his hand. If he doesn't, he gains a Curse.\\n\\n\\nSetup: Add an extra Kingdom card pile costing 2 Coin or 3 Coin to the Supply. Cards from that pile are Bane cards.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 6,
        "name": "Altar",
        "set": "darkages",
        "tags": [
            "trash_for_benefit",
            "gainer"
        ],
        "text": "Trash a card from your hand. Gain a card costing up to 5 Coin.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Armory",
        "set": "darkages",
        "tags": [
            "gainer"
        ],
        "text": "Gain a card costing up to 4 Coin, putting it on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Band of Misfits",
        "set": "darkages",
        "tags": [],
        "text": "Play this as if it were an Action card in the Supply costing less than it that you choose.\\nThis is that card until it leaves play.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 5,
        "name": "Bandit Camp",
        "set": "darkages",
        "tags": [
            "gainer"
        ],
        "text": "+1 Card\\n+2 Actions\\n\\nGains a Spoils from the Spoils pile.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 2,
        "name": "Beggar",
        "set": "darkages",
        "tags": [
            "spam_filter"
        ],
        "text": "Gain 3 Coppers, putting them into your hand.\\n\\n\\nWhen another player plays an Attack card, you may discard this. If you do, gain two Silvers, putting one on top of your deck.",
        "types": [
            "Action",
            "Reaction"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "name": "Catacombs",
        "set": "darkages",
        "tags": [
            "likes_being_trashed"
        ],
        "text": "Look at the top 3 cards of your deck. Choose one: Put them into your hand; or discard them and +3 Cards.\\n\\n\\nWhen you trash this, gain a cheaper card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "name": "Count",
        "set": "darkages",
        "tags": [
            "mass_trasher",
            "virtual_coin"
        ],
        "text": "Choose one: Discard 2 cards; or put a card from your hand on top of your deck; or gain a Copper.\\n\\nChoose one: +3 Coin; or trash your hand; or gain a Duchy.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Counterfeit",
        "set": "darkages",
        "tags": [
            "early_trasher",
            "treasure_eater"
        ],
        "text": "1 Coin\\n+1 Buy\\n\\nWhen you play this, you may play a Treasure from your hand twice. If you do, trash that Treasure.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "likes_diversity",
            "action_fetishist"
        ],
        "name": "Cultist",
        "set": "darkages",
        "tags": [
            "junk_attack",
            "likes_being_trashed"
        ],
        "text": "+2 Cards\\n\\nEach other player gains a Ruins. You may play a Cultist from your hand.\\n\\n\\nWhen you trash this, +3 Cards.",
        "types": [
            "Action",
            "Attack",
            "Looter"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Death Cart",
        "set": "darkages",
        "tags": [
            "trash_for_benefit",
            "action_fetishist",
            "virtual_coin"
        ],
        "text": "+5 Coin\\n\\nYou may trash an Action card from your hand. If you don't, trash this.\\n\\n\\nWhen you gain this, gain 2 Ruins.",
        "types": [
            "Action",
            "Looter"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Feodum",
        "set": "darkages",
        "tags": [
            "likes_being_trashed"
        ],
        "text": "Worth 1 Victory for every 3 Silvers in your deck (rounded down).\\n\\n\\nWhen you trash this, gain 3 Silvers.",
        "types": [
            "Victory"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 3,
        "name": "Forager",
        "set": "darkages",
        "tags": [
            "trasher",
            "early_trasher",
            "virtual_coin"
        ],
        "text": "+1 Action\\n+1 Buy\\nTrash a card from your hand. +1 Per differently named Treasure in the trash.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": true,
        "cost": 4,
        "name": "Fortress",
        "set": "darkages",
        "tags": [
            "likes_being_trashed"
        ],
        "text": "+1 Card\\n+2 Actions\\n\\n\\nWhen you trash this, put it into your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "name": "Graverobber",
        "set": "darkages",
        "tags": [
            "trash_for_benefit",
            "gainer"
        ],
        "text": "Choose one: Gain a card from the trash costing from 3 Coin to 6 Coin, putting it on top of your deck; or trash an Action card from your hand and gain a card costing up to 3 Coin more than it.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": true,
        "cost": 3,
        "name": "Hermit",
        "set": "darkages",
        "tags": [
            "trasher",
            "gainer"
        ],
        "text": "Look through your discard pile. You may trash a card from your discard pile or hand that is not a Treasure.\\nGain a card costing up to 3 Coin.\\n\\n\\nWhen you discard this from play, if you did not buy any cards this turn, trash this and gain a Madman from the Madman pile.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 6,
        "name": "Hunting Grounds",
        "set": "darkages",
        "tags": [
            "likes_being_trashed"
        ],
        "text": "+4 Cards\\n\\n\\nWhen you trash this, gain a Duchy or 3 Estates.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 4,
        "name": "Ironmonger",
        "set": "darkages",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\nReveal the top card of your deck; you may discard it. Either way, if it's an...\\nAction card, +1 Action\\nTreasure card\\n+1 Coin\\nVictory card, +1 Card",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Junk Dealer",
        "set": "darkages",
        "tags": [
            "trasher",
            "early_trasher",
            "virtual_coin"
        ],
        "text": "+1 Card\\n+1 Action\\n+1 Coin\\n\\nTrash a card from your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "countered_by": [
            "draw_to_x",
            "likes_being_discarded"
        ],
        "name": "Knights",
        "set": "darkages",
        "tags": [
            "handsize_attack"
        ],
        "text": "(varies)\\nEach other player reveals the top 2 cards of his deck, trashes one of them costing from 3 Coin to 6 Coin, and discards the rest. If a Knight is trashed by this, trash this card.",
        "types": [
            "Action",
            "Attack",
            "Knight"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "countered_by": [
            "trasher",
            "likes_diversity",
            "action_fetishist"
        ],
        "name": "Marauder",
        "set": "darkages",
        "tags": [
            "junk_attack"
        ],
        "text": "Gain a Spoils from the Spoils pile. Each other player gains a Ruins.",
        "types": [
            "Action",
            "Attack",
            "Looter"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 3,
        "name": "Market Square",
        "set": "darkages",
        "tags": [
            "likes_being_discarded"
        ],
        "text": "+1 Card\\n+1 Action\\n+1 Buy\\n\\n\\nWhen one of your cards is trashed, you may discard this from your hand. If you do, gain a Gold.",
        "types": [
            "Action",
            "Reaction"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 5,
        "name": "Mystic",
        "set": "darkages",
        "tags": [
            "deck_inspector",
            "virtual_coin"
        ],
        "text": "+1 Action\\n+2 Coins\\n\\nName a card.\\nReveal the top card of your deck. If it's the named card, put it into your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "silver_generator"
        ],
        "name": "Pillage",
        "set": "darkages",
        "tags": [
            "gainer"
        ],
        "text": "Trash this. Each other player with 5 or more cards in hand reveals his hand and discards a card that you choose.\\nGain 2 Spoils from the Spoils pile.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 1,
        "name": "Poor House",
        "set": "darkages",
        "tags": [
            "virtual_coin",
            "likes_being_discarded"
        ],
        "text": "+4 Coin\\n\\nReveal your hand. -1 Coin per Treasure card in your hand, to a minimum of 0 Coin.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 4,
        "name": "Procession",
        "set": "darkages",
        "tags": [
            "trash_for_benefit"
        ],
        "text": "You may play an Action card from your hand twice. Trash it. Gain an Action card costing exactly 1 Coin more than it.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 4,
        "name": "Rats",
        "set": "darkages",
        "tags": [
            "likes_being_trashed"
        ],
        "text": "+1 Card\\n+1 Action\\n\\nGain a Rats. Trash a card from your hand other than a Rats (or reveal your hand of all Rats).\\n\\n\\nWhen you trash this, +1 Card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "countered_by": [],
        "name": "Rebuild",
        "set": "darkages",
        "tags": [
            "overpowered",
            "trash_for_benefit"
        ],
        "text": "+1 Action\\n\\nName a card. Reveal cards from the top of your deck until you reveal a Victory card that is not the named card. Discard the other cards. Trash the Victory card and gain a Victory card costing up to 3 Coin more than it.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "countered_by": [
            "gainer"
        ],
        "name": "Rogue",
        "set": "darkages",
        "tags": [
            "virtual_coin"
        ],
        "text": "+2 Coin\\n\\nIf there are any cards in the trash costing from 3 Coin to 6 Coin, gain one of them. Otherwise, each other player reveals the top 2 cards of his deck, trashes one of them costing from 3 Coin to 6 Coin, and discards the rest.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "name": "Sage",
        "set": "darkages",
        "tags": [],
        "text": "+1 Action\\n\\nReveal cards from the top of your deck until you reveal one costing 3 Coin or more. Put that card into your hand and discard the rest.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 4,
        "name": "Scavenger",
        "set": "darkages",
        "tags": [
            "virtual_coin"
        ],
        "text": "+2 Coin\\nYou may put your deck into your discard pile. Look through your discard pile and put one card from it on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 2,
        "name": "Squire",
        "set": "darkages",
        "tags": [
            "needs_attacks",
            "likes_being_trashed",
            "virtual_coin",
            "silver_generator"
        ],
        "text": "+1 Coin\\n\\nChoose one: +2 Actions; or +2 Buys; or gain a Silver.\\n\\n\\nWhen you trash this, gain an Attack card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 3,
        "name": "Storeroom",
        "set": "darkages",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Buy\\n\\nDiscard any number of cards. +1 Card per card discarded.\\nDiscard any number of cards. +1 Coin per card discarded the second time.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 4,
        "countered_by": [
            "draw_to_x",
            "likes_being_discarded"
        ],
        "name": "Urchin",
        "set": "darkages",
        "tags": [
            "handsize_attack"
        ],
        "text": "+1 Card\\n+1 Action\\n\\nEach other player discards down to 4 cards in hand.\\n\\n\\nWhen you play another attack card with this in play, you may trash this. If you do, gain a Mercenary from the Mercenary pile.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "name": "Vagrant",
        "set": "darkages",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\nReveal the top card of your deck. If it's a Curse, Ruins, Shelter, or Victory card, put it into your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 4,
        "name": "Wandering Minstrel",
        "set": "darkages",
        "tags": [],
        "text": "+1 Card\\n+2 Actions\\n\\nReveal the top 3 cards of your deck. Put the Actions back on top in any order and discard the rest.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 6,
        "name": "Adventurer",
        "set": "dominion",
        "tags": [
            "sifter"
        ],
        "text": "Reveal cards from your deck until you reveal 2 Treasure cards. Put those Treasure cards into your hand and discard the other revealed card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "countered_by": [
            "trash_for_benefit",
            "deck_inspector",
            "sifter"
        ],
        "name": "Bureaucrat",
        "set": "dominion",
        "tags": [
            "handsize_attack",
            "silver_generator"
        ],
        "text": "Gain a Silver card; put it on top of your deck. Each other player reveals a Victory card from his hand and puts it on his deck (or reveals a hand with no Victory cards).",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "name": "Cellar",
        "set": "dominion",
        "tags": [
            "sifter"
        ],
        "text": "+1 Action\\n\\nDiscard any number of cards. +1 Card per card discarded.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 3,
        "name": "Chancellor",
        "set": "dominion",
        "tags": [
            "virtual_coin"
        ],
        "text": "+2 Coins\\n\\nYou may immediately put your deck into your discard pile.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 2,
        "countered_by": [
            "treasure_trasher",
            "steals_treasure"
        ],
        "name": "Chapel",
        "set": "dominion",
        "tags": [
            "overpowered",
            "mass_trasher",
            "early_trasher"
        ],
        "text": "Trash up to 4 cards from your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Council Room",
        "set": "dominion",
        "tags": [],
        "text": "+4 Cards\\n+1 Buy\\n\\nEach other player draws a card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Feast",
        "set": "dominion",
        "tags": [
            "gainer"
        ],
        "text": "Trash this card. Gain a card costing up to 5 Coins.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 5,
        "name": "Festival",
        "set": "dominion",
        "tags": [
            "virtual_coin"
        ],
        "text": "+2 Actions\\n+1 Buy\\n+2 Coins",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Gardens",
        "set": "dominion",
        "tags": [],
        "text": "Worth 1 Victory for every 10 cards in your deck (rounded down).",
        "types": [
            "Victory"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Laboratory",
        "set": "dominion",
        "tags": [],
        "text": "+2 Cards\\n+1 Action",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Library",
        "set": "dominion",
        "tags": [
            "draw_to_x"
        ],
        "text": "Draw until you have 7 cards in hand. You may set aside any Action cards drawn this way, as you draw them; discard the set aside cards after you finish drawing.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Market",
        "set": "dominion",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Card\\n+1 Action\\n+1 Buy\\n+1 Coin",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "countered_by": [
            "draw_to_x",
            "likes_being_discarded"
        ],
        "name": "Militia",
        "set": "dominion",
        "tags": [
            "handsize_attack",
            "virtual_coin"
        ],
        "text": "+2 Coins\\n\\nEach other player discards down to 3 cards in his hand.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Mine",
        "set": "dominion",
        "tags": [
            "trash_for_benefit"
        ],
        "text": "Trash a Treasure card from your hand. Gain a Treasure card costing up to 3 Coins or more; put it into your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 2,
        "name": "Moat",
        "set": "dominion",
        "tags": [
            "needs_attacks",
            "counters_attacks"
        ],
        "text": "+2 Cards\\n\\n\\nWhen another player plays an Attack card, you may reveal this from your hand. If you do, you are unaffected by that Attack.",
        "types": [
            "Action",
            "Reaction"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Moneylender",
        "set": "dominion",
        "tags": [
            "early_trasher",
            "treasure_eater",
            "virtual_coin"
        ],
        "text": "Trash a Copper card from your hand. If you do, +3 Coins.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 4,
        "name": "Remodel",
        "set": "dominion",
        "tags": [
            "trash_for_benefit"
        ],
        "text": "Trash a card from your hand. Gain a card costing up to 2 Coins more than the trashed card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Smithy",
        "set": "dominion",
        "tags": [],
        "text": "+3 Cards",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "countered_by": [
            "M_mostly_harmless",
            "sifter",
            "deck_inspector"
        ],
        "name": "Spy",
        "set": "dominion",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\n\\nEach player (including you) reveals the top card of his deck and either discards it or puts it back, your choice.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "countered_by": [
            "virtual_coin"
        ],
        "name": "Thief",
        "set": "dominion",
        "tags": [
            "treasure_trasher",
            "steals_treasure"
        ],
        "text": "Each other player reveals the top 2 cards of his deck. If they are revealed any Treasure cards, they trash one of them that you choose. You may gain any or all of these trashed cards. They discard the other revealed cards.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 4,
        "name": "Throne Room",
        "set": "dominion",
        "tags": [],
        "text": "Choose an Action card in your hand. Play it twice.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 3,
        "name": "Village",
        "set": "dominion",
        "tags": [],
        "text": "+1 Card\\n+2 Actions",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "mass_trasher",
            "trasher",
            "spam_filter",
            "gainer",
            "silver_generator"
        ],
        "name": "Witch",
        "set": "dominion",
        "tags": [
            "overpowered",
            "junk_attack"
        ],
        "text": "+2 Cards\\nEach other player gains a Curse card.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "name": "Woodcutter",
        "set": "dominion",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Buy\\n+2 Coins",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "name": "Workshop",
        "set": "dominion",
        "tags": [
            "gainer"
        ],
        "text": "Gain a card costing up to 4 Coins.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Advisor",
        "set": "guilds",
        "tags": [],
        "text": "+1 Action\\n\\nReveal the top 3 cards of your deck. The player to your left chooses one of them. Discard that card. Put the other cards into your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 5,
        "name": "Baker",
        "set": "guilds",
        "tags": [
            "virtual_coin"
        ],
        "text": "\\n+1 Card\\n+1 Action\\nTake a Coin token.\\n\\n\\nSetup: Each player takes a Coin token.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Butcher",
        "set": "guilds",
        "tags": [
            "trasher",
            "trash_for_benefit",
            "virtual_coin"
        ],
        "text": "Take 2 Coin tokens. You may trash a card from your hand and then pay any number of Coin tokens. If you did trash a card, gain a card with a cost up to the cost of the trashed card plus the number of Coin tokens you paid.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "name": "Candlestick Maker",
        "set": "guilds",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Action\\n+1 Buy\\n\\nTake a Coin token.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 3,
        "cost_extra": "+",
        "name": "Doctor",
        "set": "guilds",
        "tags": [
            "mass_trasher",
            "deck_inspector"
        ],
        "text": "Name a card. Reveal the top 3 cards of your deck. Trash the matches. Put the rest back on top in any order.\\n\\n\\nWhen you buy this, you may overpay for it. For each 1 Coin you overpaid, look at the top card of your deck; trash it, discard it, or put it back.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "cost_extra": "+",
        "name": "Herald",
        "set": "guilds",
        "tags": [
            "action_fetishist"
        ],
        "text": "+1 Card\\n+1 Action\\n\\nReveal the top card of your deck. If it's an Action card, play it.\\n\\n\\nWhen you buy this, you may overpay for it. For each 1 Coin you overpaid, look through your discard pile and put a card from it on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Journeyman",
        "set": "guilds",
        "tags": [
            "counters_junk"
        ],
        "text": "Name a card. Reveal cards from the top of your deck until you reveal 3 cards that are not the named card. Put those cards into your hand and discard the rest.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "cost_extra": "+",
        "name": "Masterpiece",
        "set": "guilds",
        "tags": [
            "silver_generator"
        ],
        "text": "1 Coin\\n\\n\\nWhen you buy this, you may overpay for it. If you do, gain a Silver per 1 Coin you overpaid.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "name": "Merchant Guild",
        "set": "guilds",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Buy\\n+1 Coin\\n\\n\\nWhile this is in play, when you buy a card, take a Coin token.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": true,
        "cost": 4,
        "name": "Plaza",
        "set": "guilds",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Card\\n+2 Actions\\nYou may discard a Treasure card. If you do, take a Coin token.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "mass_trasher",
            "trasher",
            "spam_filter",
            "steals_treasure"
        ],
        "name": "Soothsayer",
        "set": "guilds",
        "tags": [
            "junk_attack",
            "gainer"
        ],
        "text": "Gain a Gold. Each other player gains a Curse. Each player who did draws a card.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 2,
        "cost_extra": "+",
        "name": "Stonemason",
        "set": "guilds",
        "tags": [
            "trash_for_benefit"
        ],
        "text": "Trash a card from your hand. Gain 2 cards costing less than it.\\n\\n\\nWhen you buy this, you may overpay for it. If you do, gain 2 Action cards each costing the amount you overpaid.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "countered_by": [
            "steals_treasure",
            "treasure_trasher"
        ],
        "name": "Taxman",
        "set": "guilds",
        "tags": [
            "handsize_attack",
            "treasure_eater"
        ],
        "text": "You may trash a Treasure card from your hand. Each other player with 5 or more cards in hand discards a copy of it (or reveals a hand without it). Gain a Treasure card costing up to 3 Coins more than the trashed card, putting it on top of your deck.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 6,
        "name": "Border Village",
        "set": "hinterlands",
        "tags": [],
        "text": "+1 Card\\n+2 Actions\\n\\n\\nWhen you gain this, gain a card costing less than this.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Cache",
        "set": "hinterlands",
        "tags": [],
        "text": "3 Coin\\n\\n\\nWhen you gain this, gain two Coppers.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Cartographer",
        "set": "hinterlands",
        "tags": [
            "deck_inspector"
        ],
        "text": "+1 Card\\n+1 Action\\n\\nLook at the top 4 cards of your deck. Put them back on top in any order.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 2,
        "name": "Crossroads",
        "set": "hinterlands",
        "tags": [],
        "text": "Reveal your hand. +1 per Victory card revealed. If this is the first time you played a Crossroads this turn, +3 Actions.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "name": "Develop",
        "set": "hinterlands",
        "tags": [
            "trash_for_benefit"
        ],
        "text": "Trash a card from your hand. Gain a card costing exactly 1 Coin more than it and gain a card costing exactly 1 Coin less than it, putting them on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 2,
        "name": "Duchess",
        "set": "hinterlands",
        "tags": [
            "virtual_coin"
        ],
        "text": "+2 Coin\\n\\nEach player (including you) looks at the top card of his deck, and discards it or puts it back.\\n\\n\\nIn games using this, when you gain a Duchy, you may gain a Duchess.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Embassy",
        "set": "hinterlands",
        "tags": [
            "indirect_interaction"
        ],
        "text": "+5 Cards\\nDiscard 3 cards.\\n\\n\\nWhen you gain this, each other player gains a Silver.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 6,
        "name": "Farmland",
        "set": "hinterlands",
        "tags": [],
        "text": "2 Victory\\n\\n\\nWhen you buy this, trash a card from your hand. Gain a card costing exactly 2 Coin more than the trashed card.",
        "types": [
            "Victory"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "name": "Fool's Gold",
        "set": "hinterlands",
        "tags": [],
        "text": "If this is the first time you played a Fool's Gold this turn, this is worth 1 Coin. Otherwise, it's worth 4 Coin.\\n\\n\\nWhen another player gains a Province, you may trash this from your hand. If you do, gain a Gold, putting it on top of your deck.",
        "types": [
            "Treasure",
            "Reaction"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Haggler",
        "set": "hinterlands",
        "tags": [
            "virtual_coin",
            "gainer"
        ],
        "text": "+2 Coin\\n\\n\\nWhile this is in play, when you buy a card, gain a card costing less than it that is not a Victory card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Highway",
        "set": "hinterlands",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Card\\n+1 Action\\n\\n\\nWhile this is in play, cards cost 1 Coin less, but not less than 0 Coins.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "spam_filter"
        ],
        "name": "Ill-Gotten Gains",
        "set": "hinterlands",
        "tags": [
            "overpowered",
            "junk_attack"
        ],
        "text": "1 Coin\\n\\nWhen you play this, you may gain a Copper, putting it into your hand.\\n\\n\\nWhen you gain this, each other player gains a Curse.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 2,
        "complicated": true,
        "cost": 5,
        "name": "Inn",
        "set": "hinterlands",
        "tags": [
            "sifter"
        ],
        "text": "+2 Cards\\n+2 Actions\\nDiscard 2 cards\\n\\n\\nWhen you gain this, look through your discard pile (including this), reveal any number of Action cards from it, and shuffle them into your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Jack of All Trades",
        "set": "hinterlands",
        "tags": [
            "deck_inspector",
            "trasher",
            "draw_to_x",
            "silver_generator"
        ],
        "text": "Gain a Silver.\\nLook at the top card of your deck; discard it or put it back.\\nDraw until you have 5 cards in hand.\\nYou may trash a card from your hand that is not a Treasure.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Mandarin",
        "set": "hinterlands",
        "tags": [],
        "text": "+3 Cards\\n\\nPut a card from your hand on top of your deck.\\n\\n\\nWhen you gain this, put all Treasures you have in play on top of your deck in any order.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "draw_to_x",
            "likes_being_discarded"
        ],
        "name": "Margrave",
        "set": "hinterlands",
        "tags": [
            "handsize_attack"
        ],
        "text": "+3 Cards\\n+1 Buy\\nEach other player draws a card, then discards down to 3 cards in hand.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "countered_by": [
            "M_alt_treasure",
            "virtual_coin"
        ],
        "name": "Noble Brigand",
        "set": "hinterlands",
        "tags": [
            "treasure_trasher",
            "steals_treasure"
        ],
        "text": "+1 Coin\\n\\nWhen you buy this or play it, each other player reveals the top 2 cards of his deck, trashes a revealed Silver or Gold you choose, and discards the rest. If he didn't reveal a Treasure, he gains a Copper. You gain the trashed cards.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Nomad Camp",
        "set": "hinterlands",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Buy\\n+2 Coin\\n\\n\\nWhen you gain this, put it on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "name": "Oasis",
        "set": "hinterlands",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Card\\n+1 Action\\n+1 Coin\\nDiscard a card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 3,
        "countered_by": [
            "deck_inspector",
            "sifter"
        ],
        "name": "Oracle",
        "set": "hinterlands",
        "tags": [
            "deck_inspector"
        ],
        "text": "Each player (including you) reveals the top 2 cards of his deck, and you choose one: either he discards them, or he puts them back on top in an order he chooses.\\n\\n+2 Cards",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "name": "Scheme",
        "set": "hinterlands",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\n\\nAt the start of Clean-up this turn, you may choose an Action card you have in play. If you discard it from play this turn, put it on your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Silk Road",
        "set": "hinterlands",
        "tags": [],
        "text": "Worth 1 Victory for every 4 Victory cards in your deck (rounded down).",
        "types": [
            "Victory"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Spice Merchant",
        "set": "hinterlands",
        "tags": [
            "early_trasher",
            "treasure_eater",
            "virtual_coin"
        ],
        "text": "You may trash a Treasure from your hand. If you do, choose one: +2 Cards and +1 Action; or +2 Coins and +1 Buy.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Stables",
        "set": "hinterlands",
        "tags": [],
        "text": "You may discard a Treasure. If you do, +3 Cards and +1 Action.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Trader",
        "set": "hinterlands",
        "tags": [
            "spam_filter",
            "silver_generator",
            "trash_for_benefit"
        ],
        "text": "Trash a card from your hand. Gain a number of Silvers equal to its cost in coins.\\n\\n\\nWhen you would gain a card, you may reveal this from your hand. If you do, instead, gain a Silver.",
        "types": [
            "Action",
            "Reaction"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "name": "Tunnel",
        "set": "hinterlands",
        "tags": [
            "likes_being_discarded"
        ],
        "text": "2 Victory\\n\\n\\nWhen you discard this other than during a Clean-up phase, you may reveal it. If you do, gain a Gold.",
        "types": [
            "Reaction",
            "Victory"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Baron",
        "set": "intrigue",
        "tags": [
            "virtual_coin",
            "gainer"
        ],
        "text": "+1 Buy\\n\\nYou may discard an Estate card. If you do, +4 Coins. Otherwise, gain an Estate card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Bridge",
        "set": "intrigue",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Buy\\n+1 Coin\\n\\n All cards (including cards in players' hands) cost 1 Coin less this turn, but not less than 0 Coins.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Conspirator",
        "set": "intrigue",
        "tags": [
            "virtual_coin"
        ],
        "text": "+2 Coins\\n\\nIf you've played 3 or more Actions this turn (counting this): +1 Card, +1 Action.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Coppersmith",
        "set": "intrigue",
        "tags": [],
        "text": "Copper produces an extra 1 Coin this turn.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 2,
        "name": "Courtyard",
        "set": "intrigue",
        "tags": [],
        "text": "+3 Cards\\n\\nPut a card from your hand on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Duke",
        "set": "intrigue",
        "tags": [],
        "text": "Worth 1 Victory per Duchy you have.",
        "types": [
            "Victory"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "name": "Great Hall",
        "set": "intrigue",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\n\\n1 Victory",
        "types": [
            "Action",
            "Victory"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 6,
        "name": "Harem",
        "set": "intrigue",
        "tags": [
            "virtual_coin"
        ],
        "text": "2 Coins\\n 2 Victory",
        "types": [
            "Treasure",
            "Victory"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Ironworks",
        "set": "intrigue",
        "tags": [],
        "text": "Gain a card costing up to 4 Coins.\\n\\nIf it's an...\\nAction card, +1 Action\\nTreasure card, +1 Coin\\nVictory card, +1 Card",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "countered_by": [],
        "name": "Masquerade",
        "set": "intrigue",
        "tags": [
            "overpowered",
            "trasher"
        ],
        "text": "+2 Cards\\n\\nEach player passes a card from his hand to the left at once. Then you may trash a card from your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 4,
        "name": "Mining Village",
        "set": "intrigue",
        "tags": [],
        "text": "+1 Card\\n+2 Actions\\n\\nYou may trash this card immediately. If you do, +2 Coins.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "likes_being_discarded",
            "draw_to_x"
        ],
        "name": "Minion",
        "set": "intrigue",
        "tags": [
            "handsize_attack",
            "virtual_coin"
        ],
        "text": "+1 Action\\n\\nChoose one: +2 Coins; or discard your hand, +4 Cards, and each other player with at least 5 cards in hand discards his hand and draws 4 cards.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 5,
        "name": "Nobles",
        "set": "intrigue",
        "tags": [
            "virtual_coin"
        ],
        "text": "Choose one: +3 Cards; or +2 Actions.\\n\\n\\n2 Victory",
        "types": [
            "Action",
            "Victory"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "name": "Pawn",
        "set": "intrigue",
        "tags": [
            "virtual_coin"
        ],
        "text": "Choose two: +1 Card; +1 Action; +1 Buy; +1 Coin. (The choices must be different.)",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "copper_strategy",
            "trash_for_benefit"
        ],
        "name": "Saboteur",
        "set": "intrigue",
        "tags": [],
        "text": "Each other player reveals cards from the top of his deck until revealing one costing 3 Coins or more. He trashes that card and may gain a card costing at most 2 Coins less than it. He discards the other revealed card.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Scout",
        "set": "intrigue",
        "tags": [
            "sifter"
        ],
        "text": "+1 Action\\n\\nReveal the top 4 cards of your deck. Put the revealed Victory cards into your hand. Put the other cards on top of your deck in any order.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 2,
        "name": "Secret Chamber",
        "set": "intrigue",
        "tags": [
            "needs_attacks",
            "virtual_coin"
        ],
        "text": "Discard any number of cards. +1 Coin per card discarded.\\n\\n\\nWhen another player plays an Attack card, you may reveal this from your hand. If you do, +2 Cards, then put 2 cards from your hand on top of your deck.",
        "types": [
            "Action",
            "Reaction"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 3,
        "name": "Shanty Town",
        "set": "intrigue",
        "tags": [],
        "text": "+2 Actions\\n\\nReveal your hand. If you have no Action cards in hand, +2 Cards.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Steward",
        "set": "intrigue",
        "tags": [
            "mass_trasher",
            "virtual_coin"
        ],
        "text": "Choose one: +2 Cards; or +2 Coins; or trash 2 cards from your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 3,
        "countered_by": [
            "deck_inspector"
        ],
        "name": "Swindler",
        "set": "intrigue",
        "tags": [
            "junk_attack"
        ],
        "text": "+2 Coins\\n\\nEach other player trashes the top card of his deck and gains a card with the same cost that you choose.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "likes_being_discarded",
            "draw_to_x",
            "spam_filter",
            "trasher",
            "mass_trasher"
        ],
        "name": "Torturer",
        "set": "intrigue",
        "tags": [
            "handsize_attack",
            "junk_attack"
        ],
        "text": "+3 Cards\\n\\nEach other player chooses one: he discards 2 cards, or he gains a Curse card, putting it in his hand.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Trading Post",
        "set": "intrigue",
        "tags": [
            "early_trasher",
            "mass_trasher"
        ],
        "text": "Trash 2 cards from your hand. If you do, gain a Silver card; put it into your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 5,
        "name": "Tribute",
        "set": "intrigue",
        "tags": [],
        "text": "The player to your left reveals then discards the top 2 cards of his deck. For each differently named card revealed, if it's an...\\nAction Card, +2 Actions\\nTreasure Card, +2 Coins\\nVictory Card, +2 Cards",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Upgrade",
        "set": "intrigue",
        "tags": [
            "trash_for_benefit"
        ],
        "text": "+1 Card\\n+1 Action\\n\\nTrash a card from your hand. Gain a card costing exactly 1 Coin more than it.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 3,
        "name": "Wishing Well",
        "set": "intrigue",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\n\\nName a card. Reveal the top card of your deck. If it's the named card, put it into your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 7,
        "name": "Bank",
        "set": "prosperity",
        "tags": [],
        "text": "When you play this, it's worth 1 Coin per Treasure card you have in play (counting this).",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Bishop",
        "set": "prosperity",
        "tags": [
            "trash_for_benefit",
            "VP_generator",
            "virtual_coin"
        ],
        "text": "+1 Coin\\n+1 Victory token\\nTrash a card from your hand. +Victory tokens equal to half its cost in coins, rounded down.\\nEach other player may trash a card from his hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 5,
        "name": "City",
        "set": "prosperity",
        "tags": [],
        "text": "+1 Card\\n+2 Actions\\n\\nIf there are one or more empty Supply piles, +1 Card. If there are two or more, +1 Coin and +1 Buy.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Contraband",
        "set": "prosperity",
        "tags": [],
        "text": "3 Coin\\n+1 Buy\\n\\nWhen you play this, the player to your left names a card. You can't buy that card this turn.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Counting House",
        "set": "prosperity",
        "tags": [
            "copper_strategy"
        ],
        "text": "Look through your discard pile, reveal any number of Copper cards from it, and put them into your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 7,
        "name": "Expand",
        "set": "prosperity",
        "tags": [
            "trash_for_benefit"
        ],
        "text": "Trash a card from your hand. Gain a card costing up to 3 Coins more than the trashed card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 7,
        "name": "Forge",
        "set": "prosperity",
        "tags": [
            "trash_for_benefit",
            "mass_trasher"
        ],
        "text": "Trash any number of cards from your hand. Gain a card with cost exactly equal to the total cost in coins of the trashed cards.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 6,
        "countered_by": [
            "draw_to_x",
            "likes_being_discarded"
        ],
        "name": "Goons",
        "set": "prosperity",
        "tags": [
            "overpowered",
            "handsize_attack",
            "virtual_coin",
            "VP_generator"
        ],
        "text": "+1 Buy\\n+2 Coin\\n\\nEach other player discards down to 3 cards in hand.\\n\\n\\nWhile this is in play, when you buy a card, +1 Victory token.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 6,
        "name": "Grand Market",
        "set": "prosperity",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Card\\n+1 Action\\n+1 Buy\\n+2 Coin\\n\\n\\nYou can't buy this if you have Copper in play.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 6,
        "name": "Hoard",
        "set": "prosperity",
        "tags": [],
        "text": "2 Coin\\n\\n\\nWhile this is in play, when you buy a Victory card, gain a Gold.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 7,
        "name": "King's Court",
        "set": "prosperity",
        "tags": [
            "overpowered"
        ],
        "text": "You may choose an Action card in your hand. Play it three times.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "name": "Loan",
        "set": "prosperity",
        "tags": [
            "early_trasher"
        ],
        "text": "1 Coin\\n\\nWhen you play this, reveal cards from your deck until you reveal a Treasure. Discard it or trash it. Discard the other cards.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Mint",
        "set": "prosperity",
        "tags": [
            "gainer"
        ],
        "text": "You may reveal a Treasure card from your hand. Gain a copy of it.\\n\\n\\nWhen you buy this, trash all Treasures you have in play.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Monument",
        "set": "prosperity",
        "tags": [
            "VP_generator",
            "virtual_coin"
        ],
        "text": "+2 Coins\\n+1 Victory token",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "mass_trasher",
            "spam_filter",
            "virtual_coin"
        ],
        "name": "Mountebank",
        "set": "prosperity",
        "tags": [
            "junk_attack"
        ],
        "text": "+2 Coin\\n\\nEach other player may discard a Curse. If he doesn't, he gains a Curse and a Copper.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 8,
        "cost_extra": "+",
        "name": "Peddler",
        "set": "prosperity",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Card\\n+1 Action\\n+1 Coin\\n\\n\\nDuring your Buy phase, this costs 2 Coin less per Action card you have in play, but not less than 0 Coin.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Quarry",
        "set": "prosperity",
        "tags": [],
        "text": "1 Coin\\n\\n\\nWhile this is in play, Action cards cost 2 Coin less, but not less than 0 Coin.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "sifter",
            "deck_inspector"
        ],
        "name": "Rabble",
        "set": "prosperity",
        "tags": [],
        "text": "+3 Cards\\n\\nEach other player reveals the top 3 cards of his deck, discards the revealed Actions and Treasures, and puts the rest back on top in any order he chooses.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 2,
        "name": "Royal Seal",
        "set": "prosperity",
        "tags": [],
        "text": "2 Coin\\n\\n\\nWhile this is in play, when you gain a card, you may put that card on top of your deck.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Talisman",
        "set": "prosperity",
        "tags": [],
        "text": "1 Coin\\n\\n\\nWhile this is in play, when you buy a card costing 4 Coin or less that is not a Victory card, gain a copy of it.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 3,
        "name": "Trade Route",
        "set": "prosperity",
        "tags": [
            "trasher",
            "virtual_coin"
        ],
        "text": "+1 Buy\\n+1 Coin per token on the Trade Route mat.\\nTrash a card from your hand.\\n\\n\\nSetup: Put a token on each Victory card Supply pile. When a card is gained from that pile, move the token to the Trade Route mat.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Vault",
        "set": "prosperity",
        "tags": [
            "indirect_interaction",
            "virtual_coin",
            "sifter"
        ],
        "text": "+2 Cards\\n\\nDiscard any number of cards. +1 Coin per card discarded. Each other player may discard 2 cards. If he does, he draws a card.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Venture",
        "set": "prosperity",
        "tags": [
            "sifter"
        ],
        "text": "1 Coin\\n\\nWhen you play this, reveal cards from your deck until you reveal a Treasure. Discard the other cards. Play that Treasure.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "name": "Watchtower",
        "set": "prosperity",
        "tags": [
            "draw_to_x",
            "spam_filter"
        ],
        "text": "Draw until you have 6 cards in hand.\\n\\n\\nWhen you gain a card, you may reveal this from your hand. If you do, either trash this card, or put it on top of your deck.",
        "types": [
            "Action",
            "Reaction"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 4,
        "name": "Worker's Village",
        "set": "prosperity",
        "tags": [],
        "text": "+1 Card\\n+2 Actions\\n+1 Buy",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "countered_by": [
            "handsize_attack",
            "mass_trasher",
            "early_trasher",
            "treasure_eater"
        ],
        "name": "Ambassador",
        "set": "seaside",
        "tags": [
            "overpowered",
            "junk_attack",
            "mass_trasher",
            "early_trasher"
        ],
        "text": "Reveal a card from your hand. Return up to 2 copies of it from your hand to the Supply. Then each player gains a copy of it.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 5,
        "name": "Bazaar",
        "set": "seaside",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Card\\n+2 Actions\\n+1 Coin",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 4,
        "name": "Caravan",
        "set": "seaside",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\n\\nAt the start of your next turn, +1 Card.",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "countered_by": [
            "draw_to_x",
            "early_trasher",
            "virtual_coin"
        ],
        "name": "Cutpurse",
        "set": "seaside",
        "tags": [
            "handsize_attack"
        ],
        "text": "+2 Coins\\n\\nEach other player discards a Copper card (or reveals a hand with no Copper).",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 2,
        "countered_by": [
            "spam_filter",
            "trasher",
            "mass_trasher"
        ],
        "name": "Embargo",
        "set": "seaside",
        "tags": [
            "junk_attack"
        ],
        "text": "+2 Coins\\n\\nTrash this card. Put an Embargo token on top of a Supply pile.\\n\\n\\nWhen a player buys a card, he gains a Curse card per Embargo token on that pile.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Explorer",
        "set": "seaside",
        "tags": [
            "silver_generator"
        ],
        "text": "You may reveal a Province from your hand. If you do, gain a Gold card, putting it into your hand. Otherwise, gain a Silver card, putting it into your hand. ",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 2,
        "complicated": false,
        "cost": 3,
        "name": "Fishing Village",
        "set": "seaside",
        "tags": [
            "virtual_coin"
        ],
        "text": "+2 Actions\\n+1 Coin\\n\\nAt the start of your next turn:\\n+1 Action\\n+1 Coin",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [
            "deck_inspector",
            "sifter",
            "draw_to_x",
            "likes_being_discarded"
        ],
        "name": "Ghost Ship",
        "set": "seaside",
        "tags": [
            "handsize_attack"
        ],
        "text": "+2 Cards\\n\\nEach other player with 4 or more cards in hand puts cards from his hand on top of his deck until he has 3 cards in his hand.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "name": "Haven",
        "set": "seaside",
        "tags": [],
        "text": "Set aside a card from your hand face down. At the start of your next turn, put it into your hand.",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Island",
        "set": "seaside",
        "tags": [
            "trasher"
        ],
        "text": "Set aside this and another card from your hand. Return them to your deck at the end of the game.\\n\\n\\n2 Victory",
        "types": [
            "Action",
            "Victory"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "name": "Lighthouse",
        "set": "seaside",
        "tags": [
            "needs_attacks",
            "counters_attacks"
        ],
        "text": "+1 Action\\n\\nNow and at the start of your next turn: +1 Coin.\\n\\n\\nWhile this is in play, when another player plays an Attack card, it doesn't affect you.",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 1,
        "complicated": true,
        "cost": 3,
        "name": "Lookout",
        "set": "seaside",
        "tags": [
            "trasher",
            "deck_inspector"
        ],
        "text": "+1 Action\\n\\nLook at the top 3 cards of your deck. Trash one of them. Discard one of them. Put the other one on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Merchant Ship",
        "set": "seaside",
        "tags": [
            "virtual_coin"
        ],
        "text": "Now and at the start of your next turn: +2 Coins.",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 2,
        "complicated": true,
        "cost": 2,
        "name": "Native Village",
        "set": "seaside",
        "tags": [],
        "text": "+2 Actions\\n\\nChoose one: Set aside the top card of your deck on your Native Village mat; or put all the cards from your mat into your hand. You may look at the cards on your mat at any time; return them to your deck at the end of the game.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 4,
        "name": "Navigator",
        "set": "seaside",
        "tags": [
            "deck_inspector",
            "virtual_coin"
        ],
        "text": "+2 Coins\\n\\nLook at the top 5 cards of your deck. Either discard all of them, or put them back on top of your deck in any order.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "name": "Outpost",
        "set": "seaside",
        "tags": [],
        "text": "You only draw 3 cards (instead of 5) in this turn's Clean-up phase. Take an extra turn after this one. This can't cause you to take more than two consecutive turns.",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 2,
        "name": "Pearl Diver",
        "set": "seaside",
        "tags": [],
        "text": "+1 Card\\n+1 Action\\n\\nLook at the bottom card of your deck. You may put it on top.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "countered_by": [
            "virtual_coin"
        ],
        "name": "Pirate Ship",
        "set": "seaside",
        "tags": [
            "treasure_trasher",
            "virtual_coin"
        ],
        "text": "Choose one: Each other player reveals the top 2 cards of his deck, trashes a revealed Treasure that you choose, discards the rest, and if anyone trashed a Treasure you take a coin token; or +1 Coin per Coin token you've taken with Pirate Ships this game.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Salvager",
        "set": "seaside",
        "tags": [
            "trash_for_benefit"
        ],
        "text": "+1 Buy\\n\\nTrash a card from your hand. +Coins equal to its cost.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "countered_by": [
            "trasher",
            "mass_trasher",
            "spam_filter"
        ],
        "name": "Sea Hag",
        "set": "seaside",
        "tags": [
            "overpowered",
            "junk_attack",
            "sifter",
            "deck_inspector"
        ],
        "text": "Each other player discards the top card of his deck, then gains a Curse card, putting it on top of his deck.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "name": "Smugglers",
        "set": "seaside",
        "tags": [
            "gainer"
        ],
        "text": "Gain a copy of a card costing up to 6 Coins that the player to your right gained on his last turn.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "name": "Tactician",
        "set": "seaside",
        "tags": [],
        "text": "Discard your hand. If you discarded any cards this way, then at the start of your next turn, +5 Cards, +1 Buy, and +1 Action.",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 4,
        "name": "Treasure Map",
        "set": "seaside",
        "tags": [],
        "text": "Trash this and another copy of Treasure Map from your hand. If you do trash two Treasure Maps, gain 4 Gold cards, putting them on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 5,
        "name": "Treasury",
        "set": "seaside",
        "tags": [
            "virtual_coin"
        ],
        "text": "+1 Card\\n+1 Action\\n+1 Coin\\n\\n\\nWhen you discard this from play, if you didn't buy a Victory card this turn, you may put this on top of your deck.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 1,
        "complicated": false,
        "cost": 3,
        "name": "Warehouse",
        "set": "seaside",
        "tags": [
            "sifter"
        ],
        "text": "+3 Cards\\n+1 Action\\n\\nDiscard 3 cards.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [],
        "name": "Wharf",
        "set": "seaside",
        "tags": [
            "overpowered"
        ],
        "text": "Now and at the start of your next turn:\\n\\n+2 Cards\\n+1 Buy",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 0,
        "debt": 4,
        "countered_by": [],
        "name": "Engineer",
        "set": "empires",
        "tags": [
            "trash_for_benefit",
            "toilet_paper"
        ],
        "text": "Gain a card costing up to 4 Coin. You may trash this. If you do, gain a card costing up to 4 Coin.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 0,
        "debt": 8,
        "countered_by": [],
        "name": "City Quarter",
        "set": "empires",
        "tags": [
        ],
        "text": "+2 Actions\\n\\nReveal your hand. +1 Card per Action card revealed.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 0,
        "debt": 8,
        "countered_by": [],
        "name": "Overlord",
        "set": "empires",
        "tags": [
        ],
        "text": "Play this as if it were an Action card in the Supply costing up to 5 Coin. This is that card until it leaves play.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 0,
        "debt": 8,
        "countered_by": [],
        "name": "Royal Blacksmith",
        "set": "empires",
        "tags": [
        ],
        "text": "+5 Cards\\n\\nReveal your hand; discard the Coppers.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 2,
        "countered_by": [],
        "name": "Encampment",
        "set": "empires",
        "tags": [
        ],
        "text": "+2 Cards\\n+2 Actions\\n\\nYou may reveal a Gold or Plunder from your hand. If you do not, set this aside, and return it to the Supply at the start of Clean-up.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 2,
        "countered_by": [],
        "name": "Patrician",
        "set": "empires",
        "tags": [
        ],
        "text": "+1 Card\\n+1 Action\\n\\nReveal the top card of your deck. If it costs 5 Coin or more, put it into your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 2,
        "countered_by": [],
        "name": "Settlers",
        "set": "empires",
        "tags": [
        ],
        "text": "+1 Card\\n+1 Action\\n\\nLook through your discard pile. You may reveal a Copper from it and put it into your hand.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 3,
        "countered_by": [],
        "name": "Castles",
        "set": "empires",
        "tags": [
        ],
        "text": "Sort the Castle pile by cost, putting the more expensive Castles on the bottom. For a 2-player game, use only one of each Castle. Only the top card of the pile can be gained or bought.",
        "types": [
            "Victory",
            "Castle"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "countered_by": [],
        "name": "Catapult",
        "set": "empires",
        "tags": [
        ],
        "text": "+1 Coin\\n\\nTrash a card from your hand. If it costs 3 Coin or more, each other player gains a Curse. If it's a Treasure, each other player discards down to 3 cards in hand.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "countered_by": [],
        "name": "Charriot Race",
        "set": "empires",
        "tags": [
        ],
        "text": "+1 Action\\n\\nReveal the top card of your deck and put it into your hand. The player to your left reveals the top card of their deck. If your card costs more, +1 Coin and +1 Victory.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 3,
        "countered_by": [],
        "name": "Enchantress",
        "set": "empires",
        "tags": [
        ],
        "text": "Until your next turn, the first time each other player plays an Action card on their turn, they get +1 Card, +1 Action instead of following its instructions. At the start of your next turn, +2 Cards.",
        "types": [
            "Action",
            "Attack",
            "Duration"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 3,
        "countered_by": [],
        "name": "Farmers\' Market",
        "set": "empires",
        "tags": [
        ],
        "text": "+1 Buy\\n\\nIf there are 4 VP or more on the Farmers\' Market Suppply pile, take them and trash this. Otherwise, add 1 VP to the pile and then +1 Coin per 1 VP on the pile.",
        "types": [
            "Action",
            "Gathering"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 3,
        "countered_by": [],
        "name": "Gladiator",
        "set": "empires",
        "tags": [
        ],
        "text": "+2 Coin\\n\\nReveal a card from your hand. The player to your left may reveal a copy from their hand. If they do not, +1 Coin and trash a Gladiator from the Supply.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 4,
        "countered_by": [],
        "name": "Sacrifice",
        "set": "empires",
        "tags": [
        ],
        "text": "Trash a card from your hand. If it's an...\\nAction card, +2 Cards, +2 Actions\\nTreasure card, +2 Coin\\nVictory card, +2 VP",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 4,
        "countered_by": [],
        "name": "Temple",
        "set": "empires",
        "tags": [
        ],
        "text": "+1 VP\\n\\nTrash from 1 to 3 differently named cards from your hand. Add 1 VP to the Temple supply pile.\\n\\n\\nWhen you gain this, take the VP from the Temple Supply pile.",
        "types": [
            "Action",
            "Gathering"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 4,
        "countered_by": [],
        "name": "Villa",
        "set": "empires",
        "tags": [
        ],
        "text": "+2 Actions\\n+1 Buy\\n+1 Coin\\n\\n\\nWhen you gain this, put it into your hand, +1 Action and if it's in your Buy phase return to your Action phase.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "countered_by": [],
        "name": "Archive",
        "set": "empires",
        "tags": [
        ],
        "text": "+1 Action\\n\\nSet aside the top 3 cards of your deck face down (you may look at them). Now and at the start of your next two turns, put one into your hand.",
        "types": [
            "Action",
            "Duration"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [],
        "name": "Capital",
        "set": "empires",
        "tags": [
        ],
        "text": "6 Coin\\n\\n+1 Buy\\n\\n\\nWhen you discard this from play, take 6 Debt, and then you may pay off Debt.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": true,
        "cost": 5,
        "countered_by": [],
        "name": "Charm",
        "set": "empires",
        "tags": [
        ],
        "text": "When you play this, choose one: +1 Buy and +2 Coin; or the next time you buy a card this turn, you may also gain a differently named card with the same cost.",
        "types": [
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [],
        "name": "Crown",
        "set": "empires",
        "tags": [
        ],
        "text": "If it's your Action phase, you may play an Action from your hand twice. If it's your Buy phase, you may play a Treasure from your hand twice.",
        "types": [
            "Action",
            "Treasure"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [],
        "name": "Forum",
        "set": "empires",
        "tags": [
        ],
        "text": "+3 Cards\\n+1 Action\\n\\nDiscard 2 cards\\n\\n\\nWhen you buy this, +1 Buy.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [],
        "name": "Groundskeeper",
        "set": "empires",
        "tags": [
        ],
        "text": "+1 Card\\n+1 Action\\n\\n\\nWhile this is in play, when you gain a Victory card, +1 VP.",
        "types": [
            "Action"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [],
        "name": "Legionary",
        "set": "empires",
        "tags": [
            "virtual_coin"
        ],
        "text": "+3 Coin\\n\\nYou may reveal a Gold from your hand. If you do, each other player discards down to 2 cards in hand, then draws a card.",
        "types": [
            "Action",
            "Attack"
        ]
    },
    {
        "actions": 0,
        "complicated": false,
        "cost": 5,
        "countered_by": [],
        "name": "Wild Hunt",
        "set": "empires",
        "tags": [
        ],
        "text": "Choose one: +3 Cards and add 1 VP to the Wild Hunt Supply pile; or gain an Estate, and if you do, take the VP from the pile.",
        "types": [
            "Action",
            "Gathering"
        ]
    }
]
`);
