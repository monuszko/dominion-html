const existing_notcards = JSON.parse(`
[
    {
        "complicated": false, 
        "cost": 0, 
        "name": "Alms", 
        "set": "adventures", 
        "tags": ["gainer"], 
        "text": "Once per turn: If you have no Treasures in play, gain a card costing up to 4 Coin."
    }, 
    {
        "complicated": false, 
        "cost": 0, 
        "name": "Borrow", 
        "set": "adventures", 
        "tags": ["virtual_coin"], 
        "text": "Once per turn: If your -1 Card token isn't on your deck, put it there and +1 Coin. "
    }, 
    {
        "complicated": false, 
        "cost": 0, 
        "name": "Quest", 
        "set": "adventures", 
        "tags": ["gainer"], 
        "text": "You may discard an Attack, two Curses, or six cards. If you do, gain a Gold."
    }, 
    {
        "complicated": false, 
        "cost": 1, 
        "name": "Save", 
        "set": "adventures", 
        "tags": [], 
        "text": "Once per turn: Set aside a card from your hand, and put it into your hand at the end of turn (after drawing)."
    }, 
    {
        "complicated": false, 
        "cost": 2, 
        "name": "Scouting Party", 
        "set": "adventures", 
        "tags": ["sifter"], 
        "text": "+1 Buy\\n\\nLook at the top 5 cards of your deck. Discard 3 of them and put the rest back in any order."
    }, 
    {
        "complicated": false, 
        "cost": 2, 
        "name": "Travelling Fair", 
        "set": "adventures", 
        "tags": [], 
        "text": "+2 Buy\\n\\nWhen you gain a card this turn, you may put it on top of your deck."
    }, 
    {
        "complicated": false, 
        "cost": 3, 
        "name": "Bonfire", 
        "set": "adventures", 
        "tags": ["early_trasher"], 
        "text": "Trash up to 2 cards you have in play."
    }, 
    {
        "complicated": false, 
        "cost": 3, 
        "name": "Expedition", 
        "set": "adventures", 
        "tags": [], 
        "text": "Draw 2 extra cards for your next hand."
    }, 
    {
        "complicated": false, 
        "cost": 3, 
        "name": "Ferry", 
        "set": "adventures", 
        "tags": [], 
        "text": "Move your -2 Coin cost token to an Action Supply pile (cards from that pile cost 2 less on your turns, but not less than 0)."
    }, 
    {
        "complicated": false, 
        "cost": 3, 
        "name": "Plan", 
        "set": "adventures", 
        "tags": [], 
        "text": "Move your Trashing token to an Action Supply pile (when you buy a card from that pile, you may trash a card from your hand.)"
    }, 
    {
        "complicated": false, 
        "cost": 4, 
        "name": "Mission", 
        "set": "adventures", 
        "tags": [], 
        "text": "Once per turn: If the previous turn wasn't yours, take another turn after this one, in which you can't buy cards."
    }, 
    {
        "complicated": true, 
        "cost": 4, 
        "name": "Pilgrimage", 
        "set": "adventures", 
        "tags": ["gainer"], 
        "text": "Once per turn: Turn your Journey token over (it starts face up); then if it is face up, choose up to 3 differently named cards you have in play and gain a copy of each."
    }, 
    {
        "complicated": false, 
        "cost": 5, 
        "name": "Ball", 
        "set": "adventures", 
        "tags": ["gainer"], 
        "text": "Take your -1 Coin token. Gain 2 cards costing up to 4 Coin."
    }, 
    {
        "complicated": false, 
        "cost": 5, 
        "name": "Raid", 
        "set": "adventures", 
        "tags": ["gainer"], 
        "text": "Gain a Silver per Silver you have in play. Each other player puts his -1 Card token on his deck."
    }, 
    {
        "complicated": false, 
        "cost": 5, 
        "name": "Seaway", 
        "set": "adventures", 
        "tags": ["gainer"], 
        "text": "Gain an Action card costing up to 4 Coin. Move your +1 Buy token to its pile (when you play a card from that pile, you first get +1 Buy)."
    }, 
    {
        "complicated": false, 
        "cost": 5, 
        "name": "Trade", 
        "set": "adventures", 
        "tags": ["gainer"], 
        "text": "Trash up to 2 cards from your hand. Gain a Silver per card you trashed."
    }, 
    {
        "complicated": false, 
        "cost": 6, 
        "name": "Lost Arts", 
        "set": "adventures", 
        "tags": [], 
        "text": "Move your +1 Action token to an Action Supply pile (when you play a card from that pile, you first get +1 Action)."
    }, 
    {
        "complicated": false, 
        "cost": 6, 
        "name": "Training", 
        "set": "adventures", 
        "tags": ["virtual_coin"], 
        "text": "Move your +1 Coin token to an Action Supply pile (when you play a card from that pile, you first get +1 Coin)."
    }, 
    {
        "complicated": false, 
        "cost": 7, 
        "name": "Inheritance", 
        "set": "adventures", 
        "tags": [], 
        "text": "Once per game: Set aside a non-Victory Action card from the Supply costing up to 4 Coin. Move your Estate token to it (your Estates gain the abilities and types of that card)."
    }, 
    {
        "complicated": false, 
        "cost": 8, 
        "name": "Pathfinding", 
        "set": "adventures", 
        "tags": [], 
        "text": "Move your +1 Card token to an Action Supply pile (when you play card from that pile, you first get +1 Card)."
    }
]
`);
