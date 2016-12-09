// note to self: this is module using 'global import' pattern
//
// Works multiple files as well as a single file, and I don't think ES2016
// 'export' and 'import' can do that.

(function (EXISTING_CARDS) {


    const LETTER_TO_SET = {
        'b': 'dominion', //base
        'i': 'intrigue',
        's': 'seaside',
        'a': 'alchemy',
        'p': 'prosperity',
        'c': 'cornucopia',
        'h': 'hinterlands',
        'd': 'darkages',
        'g': 'guilds',
        'v': 'adventures',
        'e': 'empires',
        'o': 'promos',
    }


    const SET_TO_LETTER = {
        'dominion': 'b', //base
        'intrigue': 'i',
        'seaside': 's',
        'alchemy': 'a',
        'prosperity': 'p',
        'cornucopia': 'c',
        'hinterlands': 'h',
        'darkages': 'd',
        'guilds': 'g',
        'adventures': 'v',
        'empires': 'e',
        'promos': 'o',
    }


    const PROMOS =  {
        'Envoy': 1,
        'Black Market': 2,
        'Stash': 3,
        'Walled Village': 4,
        'Governor': 5,
        'Prince': 6,
        'Summon': 7,
    }


    // TODO: camelCase
    // TODO: jslint

    // This object collects and stores data entered by user.
    function getUserInput() {

        userInput = {

            collectInputs () {
                for (var input of document.getElementsByTagName('input')) {
                    if (input.type == 'text') {
                        this[input.id] = input.value;
                    }
                    else if (input.type == 'checkbox') {
                        this[input.id] = input.checked;
                    }
                    else if (input.type == 'radio' && input.checked) {
                        this[input.name] = input.id;
                    }
                }
            },

            // User input that requires a little extra work or is inferred
            recalculate () {
                this['ownedSets'] = this.getOwnedSets();
                this['promoNames'] = this.getPromoNames();
                this['ownedCards'] = this.getOwnedCards();
                this.markOwnedSets();
                this.markOwnedPromos();
            },

            getOwnedSets () {
                var ownedSets = new Set();

                var whichSets = this['expansions'];
                var neededSets = this['sets'].toLowerCase();
                var neededCosts = this['costs'].toLowerCase();

                for (var letter of Object.keys(LETTER_TO_SET)) {

                    if (whichSets.includes(letter) || neededSets.includes(letter)) {
                        var expansion = LETTER_TO_SET[letter];
                        ownedSets.add(expansion)
                    }
                    if (neededCosts.includes('p')) {
                        ownedSets.add('alchemy');
                    }
                    if (neededCosts.includes('d')) {
                        ownedSets.add('empires');
                    }
                    // TODO: add overpay and cost 7,8... once the dust has settled.
                }
                return ownedSets;
            },

            getPromoNames () {
                var promoNames = new Set();

                for (var promoName of Object.keys(PROMOS)) {
                    var digit = PROMOS[promoName];
                    if (userInput['expansions'].includes(digit)) {
                        promoNames.add(promoName);
                    }
                }
                return promoNames;
            },

            getOwnedCards () {
                var ownedCards = [];

                for (var card of EXISTING_CARDS) {
                    if (this['ownedSets'].has(card.set)) {
                        ownedCards.push(card);
                    }
                else if (this['promoNames'].has(card.name)) {
                        ownedCards.push(card);
                    }
                }
                return ownedCards;
            },

            isBad () {
                if (this['ownedCards'].length < 13) {
                    return true;
                }
                for (var id of ['sets', 'costs']) {
                    if (upperWithLower(this[id])) {
                        return true;
                    }
                }
                return false;
            },

            markOwnedSets () {
                for (var set of Object.keys(SET_TO_LETTER)) {
                    var span = document.getElementById('set-' + set);
                    if (this['ownedSets'].has(set)) {
                        span.classList.add('selected');
                    }
                    else {
                        span.classList.remove('selected');
                    }
                }
            },

            markOwnedPromos () {
                for (var promoName of Object.keys(PROMOS)) {
                    var digit = PROMOS[promoName];
                    var span = document.getElementById('promo-' + digit);

                    if (this['promoNames'].has(promoName)) {
                        span.classList.add('selected');
                    }
                    else {
                        span.classList.remove('selected');
                    }
                }
            }
        }

        userInput.collectInputs();
        userInput.recalculate();
        return userInput;
    }


    // ECMAScript doesn't specify that Array.sort() is stable, and Chrome uses
    // QuickSort instead of InsertionSort for lists > 10, so I need to roll my own.
    function niceAndStableInsertionSort(alist, key) {
        var len = alist.length;
        var position, currentvalue;

        for (var index = 1; index < len; index++) {
            currentvalue = alist[index];
            position = index;
            while (position > 0 && key(alist[position-1]) > key(currentvalue)) {
                alist[position] = alist[position-1];
                position -= 1;
            }
            alist[position] = currentvalue;
        }
        return alist;
    }


    function abbrev(words) {
        var abbrev = [];
        if (words.length < 2) {
            return words;
        }
        for (var word of words) {
            firstLetter = word[0];
            lastLetter = word.slice(-1);
            middle = '<span class="notphone">' + word.slice(1, -1) + '</span>';
            abbrev.push(firstLetter + middle + lastLetter);
        }
        abbrev = abbrev.join('-');
        return abbrev
    }


    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    function shuffledArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }


    // TODO: smells of object method!
    function costsItRemoves(card, neededCosts) {
        var costs = '';
        if (neededCosts.includes(card.cost)) {
            costs += card.cost;
        }
        if (card.potion) {
            if (neededCosts.includes('p')) {
                costs += 'p';
            }
            else if (neededCosts.includes('P')) {
                costs += 'P';
            }
        }
        if (card.debt > 0) {
            if (neededCosts.includes('d')) {
                costs += 'd';
            }
            else if (neededCosts.includes('D')) {
                costs += 'D';
            }
        }
        return costs;
    }


    // TODO: smells of object method!
    function setsItRemoves(card, neededSets) {
        var sets = '';
        var letter = SET_TO_LETTER[card.set];
        if (neededSets.includes(letter)) {
            sets += letter;
        }
        else if (neededSets.includes(letter.toUpperCase())) {
            sets += letter.toUpperCase();
        }
        else if (card.set == 'promos') {
            for (var promo of Object.keys(PROMOS)) {
                if (PROMOS[promo] == card.name) {
                    sets += promo;
                    break;
                }
            }
        }
        return sets;
    }


    function typesItRemoves(card, neededTypes) {
        var types = '';
        if (card.types.indexOf('Event') != -1 ||
                card.types.indexOf('Landmark') != -1) {
            types += 'H';
        }
        return types;
    }


    // TODO: smells of object method!
    function cardIsBanned(card, chosen, newbies) {
        if (newbies && card.tags.indexOf('complicated') != -1) {
            return true;
        }
        if (chosen.bannedSets.has(SET_TO_LETTER[card.set])) {
            return true;
        }
        if (card.potion && chosen.bannedCosts.has('p')) {
            return true;
        }
        if (card.debt && chosen.bannedCosts.has('d')) {
            return true;
        }
        if (isHorizontal(card) && chosen.bannedTypes.has('h')) {
            return true;
        }
        // like in Roman numerals, there's no number for 'zero',
        // so events/landmarks have to be banned if zero is wanted.
        if (isHorizontal(card) && chosen.horizontalCount == 0) {
            return true;
        }
        return false;
    }


    // Dominion rules state the horizontal cards - Events and Landmarks - are not
    // affected by card text using the word "card".
    function isHorizontal(card) {
        if (card.types.indexOf('Event') != -1 ||
                card.types.indexOf('Landmark') != -1) {
            return true;
        }
        return false;
    }


    function charsRemoved(removedIn, removed) {
        for (var ch of removed) {
            removedIn = removedIn.replace(ch, '');
        }
        return removedIn;
    }


    // if set of the processed card is on the list of EXACT set requirements
    // AND the card finishes the requirement, ban the set. More would exceed
    // the EXACT requirement.
    function updatedBanned(banned, charsRemoved, requirementString) {
        var exactRequirements = charsRemoved.replace(/[^A-Z]/g, '');
        for (var ch of exactRequirements) {
            if (!requirementString.includes(ch)) {
                banned.add(ch.toLowerCase());
            }
        }
        return banned;
    }


    // return true if the string contains the SAME LETTER in upper and lowercase.
    // It makes no sense to request EXACTLY 3 Seaside AND 3+ Seaside cards.
    function upperWithLower(text) {
        return (new Set(text).size != new Set(text.toLowerCase()).size);
    }

    // Requirements like costs or expansions can be checked independently
    // on a card-by-card basis, meaning they can be fulfilled on the first run!
    function getRequiredCards(chosen, userInput) {
        var neededCosts = userInput['costs'];
        var neededSets = userInput['sets'];

        var neededTypes = 'H'.repeat(chosen.horizontalCount);

        chosen.randomPool = shuffledArray(userInput['ownedCards']);

        for (var card of chosen.randomPool) {
            if (!(neededCosts || neededSets || neededTypes)) {
                chosen.success = true;
                break;
            }
            if (chosen.cards.length == 10) {
                break;
            }
            if (cardIsBanned(card, chosen, userInput['newbies'])) {
                continue;
            }
            var costsRemoved = costsItRemoves(card, neededCosts);
            var setsRemoved = setsItRemoves(card, neededSets);
            var typesRemoved = typesItRemoves(card, neededTypes);

            if (costsRemoved || setsRemoved || typesRemoved) {
                
                neededSets = charsRemoved(neededSets, setsRemoved);
                neededCosts = charsRemoved(neededCosts, costsRemoved);
                neededTypes = charsRemoved(neededTypes, typesRemoved);

                chosen.bannedSets = updatedBanned(chosen.bannedSets, setsRemoved, neededSets);
                chosen.bannedCosts = updatedBanned(chosen.bannedCosts, costsRemoved, neededCosts);
                chosen.bannedTypes = updatedBanned(chosen.bannedTypes, typesRemoved, neededTypes);

                chosen.cards.push(card);
                chosen.roles[card.name] = 'normal';
                if (isHorizontal(card)) {
                    chosen.roles[card.name] = 'horizontal';
                }
            }
        }
        return chosen;
    }

        // time to pad the result with cards which weren't requested
        // but are okay to have.
    function upToTen(chosen, userInput) {
        for (var card of chosen.randomPool) {
            if (chosen.cards.length == 10 + chosen.horizontalCount) {
                chosen.success = true;
                break;
            }
            if (chosen.roles[card.name]) {
                continue;
            }
            if (cardIsBanned(card, chosen, userInput['newbies'])) {
                continue;
            }
            chosen.cards.push(card);
            chosen.roles[card.name] = 'normal';
        }
        return chosen;
    }


    function attackCountered(attackCard, tags) {
        var counters = attackCard.counteredBy || [];

        if (counters.indexOf('M_mostly_harmless') > -1) {
            console.log(attackCard.name + ' is mostly harmless.');
            return true;
        }

        if (attackCard.name == 'Young Witch') {
            console.log('Young Witch has a counter by definition.');
            return true;
        }

        if (tags['countersAttacks'] > 0) {
            console.log('Attack ' + attackCard.name + ' countered by Moat/Lighthouse.');
            return true;
        }

        var countersItself;
        for (var counter of counters) {
                countersItself = 0;
                if (attackCard.tags.indexOf(counter) > -1) {
                    countersItself = 1;
                }
                if (tags[counter] - countersItself > 0) {
                    console.log(attackCard.name + ' countered by ' + counter);
                    return true;
            }
        }
        console.log(attackCard.name + ' NOT COUNTERED');
        return false;
    }


    function attacksCountered(cards, tags) {
            for (var card of cards) {
                if (card.types.indexOf('Attack') != -1) {
                    if (!attackCountered(card, tags)) {
                         return false;
                    }
                }
            }
            return true;
        }


    // Check more sophisticated conditions, card relationships etc.
    // These can't really be done on the first run.
    function conditionsPassed(cards, userInput) {
        var tags, cardTypes
        [tags, cardTypes] = getStats(cards);

        // condition: cards that NEED attack should appear alongside attacks
        if ((tags['needsAttacks'] >= 1) && !cardTypes.has('Attack')) {
            console.log('REJECTING set because it has cards that need attacks but no attacks.');
            return false;
        }

        // condition: attacks
        if (userInput['attacks'] == 'attacks-none') {
            if (cardTypes.has('Attack')) {
                console.log('Attacks forbidden, so rejecting the set:');
                return false
                }
            }
        // TODO: The above can be checked on first run, but is it worth it ?

        if (userInput['attacks'] == 'attacks-countered') {
            if (!attacksCountered(cards, tags)) {
                return false;
            }
        }
        return true;
    }


    function hideAllCards() {
        var displayedCards = document.getElementsByTagName('figure');
        for (var dcard of displayedCards) {
            dcard.classList.add('hidden');
        }
    }


    function paintCard(source, targetIndex, roles) {
        var target = document.getElementById('card-' + targetIndex);
        target.classList.remove('hidden');
        target.classList.remove('reaction', 'treasure', 'duration', 'victory', 'reserve', 'landmark', 'bane', 'horizontal');
        for (var set of Object.keys(SET_TO_LETTER)) {
            target.classList.remove(set);
        }
        target.classList.add(source.set);

        target.setAttribute('alt', source.text);
        if (source.name == 'Black Market') {
            var bmStock = [];
            for (var bm of Object.keys(roles)) {
                if (roles[bm] == 'black market') {
                    bmStock.push(bm);
                }
            }
            bmStock = '\n\nStock: ' + bmStock.join(', ');
            target.setAttribute('alt', target.getAttribute('alt') + bmStock);
        }
        target.querySelector('figcaption').textContent = source.name;
        target.querySelector('.card-type').innerHTML = abbrev(source.types);

        target.querySelector('.coin-cost').textContent = source.cost;
        target.querySelector('.coin-cost').textContent += source.costExtra || '';
        target.querySelector('.debt-cost').textContent = source.debt || '';

        if (source.potion) {
            target.querySelector('.potion').classList.remove('hidden');
        }
        else {
            target.querySelector('.potion').classList.add('hidden');
        }

        if (source.cost == 0 && (source.potion || source.debt)) {
            target.querySelector('.coin-cost').textContent='';
        }

        if (isHorizontal(source)) {
            target.classList.add('horizontal');
        }

        if (roles[source.name] == 'bane') {
            target.classList.add('bane');
        }
        
        if (source.types.indexOf('Reaction') != -1) {
            target.classList.add('reaction');
        }
        else if (source.types.indexOf('Reserve') != -1) {
            target.classList.add('reserve');
        }
        else if (source.types.indexOf('Treasure') != -1) {
            target.classList.add('treasure');
        }
        else if (source.types.indexOf('Victory') != -1) {
            target.classList.add('victory');
        }
        else if (source.types.indexOf('Duration') != -1) {
            target.classList.add('duration');
        }
        else if (source.types.indexOf('Landmark') != -1) {
            target.classList.add('landmark');
        }
    }


    function presentResults(chosen) {
        var result = chosen.cards;
        
        function cardRole(x) {
            switch (chosen.roles[x.name]) {
                case 'horizontal':
                    return 2;
                case 'bane':
                    return 1;
                case 'normal':
                    return 0;
                default:
                    return -1;
            }
        }

        result = niceAndStableInsertionSort(result, function(a){return a.cost;});
        result = niceAndStableInsertionSort(result, cardRole);
        // insert chosen cards into page:
        for (var i = 0; i < result.length; i++) {
            paintCard(result[i], i, chosen.roles);
        }
    }


    // TODO: method on chosen ?
    function getStats(cards) {
        // Check what card types there are. ONLY USED IN ONE PLACE
        var cardTypes = new Set();
        var tags = new Object()

        for (var card of cards) {
            for (var typ of card.types) {
                cardTypes.add(typ);
                if (typ == 'Treasure') {
                    // TODO: the tag seems currently unused.
                    tags['SPECIALaltTreasure'] = 1;
                }
            }
            for (var tag of card.tags) {
                if (tags[tag] === undefined)
                {
                    tags[tag] = 1;
                }
                else  {
                    tags[tag] += 1;
                }
            }
        }
        return [tags, cardTypes];
    }


    function showKingdom(userInput) {
        var maxTries = 1000;

        // chosen - stores context of a single "Randomize" button press
        var chosen = new Object();
        chosen.horizontalCount = getHorizontalCount(userInput['ownedCards'], userInput['horizontals']);

        hideAllCards();
        if (userInput.isBad()) {
            return chosen;
        }

        for (var attempt = 0; attempt < maxTries; attempt++) {
            chosen.cards = new Array();

            // A little help on roles:
            //
            // normal: a normally selected card,
            // horizontal: landmark/event, not affected by rules mentioning 'card',
            // black market: part of the Black Market stock,
            // swiped - player manually rejected this card,
            chosen.roles = new Object();
            chosen.success = false;
            chosen.bannedSets = new Set(); // user inputs uppercase set letters
            chosen.bannedCosts = new Set(); // P/D; no uppercase digits (yet!)
            chosen.bannedTypes = new Set();

            var chosen = getRequiredCards(chosen, userInput);
            if (!chosen.success) {
                continue;
            }
            var chosen = upToTen(chosen, userInput);

            mayAddColonyPlatinum(chosen.cards, userInput['prosperity']);
            mayAddShelters(chosen.cards, userInput['darkages']);
            chosen.roles = mayAddBlackMarketStock(chosen.roles, chosen.randomPool);
            if (chosen.roles['Young Witch'] == 'normal' ||
                    chosen.roles['Young Witch'] == 'black market') {
                var args = [chosen, userInput['newbies']];
                var bane = chosen.randomPool.find(passesBaneTests, args);
                if (!bane) {
                    continue;
                }
                chosen.roles[bane.name] = 'bane';
                chosen.cards.push(bane);
            }

            if (!conditionsPassed(chosen.cards, userInput)) {
                continue;
            }
            break;
        }
        if (attempt == maxTries) {
            hideAllCards();
            return chosen;
        }
        presentResults(chosen);
        return chosen;
    }


    function passesBaneTests(card, thisArg) {
        var chosen = this[0];
        if (chosen.roles[card.name]) {
            return false;
        }
        if (card.cost != 2 && card.cost != 3) {
            return false;
        }
        if (isHorizontal(card)) {
            return false;
        }
        var newbies = this[1];
        if (cardIsBanned(card, chosen, newbies)) {
            return false;
        }
        return true;
    }


    function mayAddBlackMarketStock(roles, cards) {
        if (roles['Black Market']) {
            var stock = cards.filter(c => !Boolean(roles[c.name]));
            stock = stock.slice(0, parseInt(userInput['black-market']));
            for (var s of stock) {
                roles[s.name] = 'black market';
            }
        }
        return roles;
    }


    function mayAddColonyPlatinum(chosenCards, prosperity) {
        if (prosperity == 'prosperity-never') {
            // Do nothing
        }
        else if (prosperity == 'prosperity-1') {
            for (var card of chosenCards) {
                if (card.cost >= 6) {
                    document.getElementById('colony').classList.remove('hidden');
                    document.getElementById('platinum').classList.remove('hidden');
                    break;
                }
            }
        }
        else if (prosperity == 'prosperity-proportional') {
            var toCheck = Math.floor(Math.random() * 10);
            if (chosenCards[toCheck].set == 'prosperity') {
                document.getElementById('colony').classList.remove('hidden');
                document.getElementById('platinum').classList.remove('hidden');
            }
        }
        else if (prosperity == 'prosperity-always') {
            document.getElementById('colony').classList.remove('hidden');
            document.getElementById('platinum').classList.remove('hidden');
        }
    }


    function mayAddShelters(chosenCards, darkages) {
        if (darkages == 'darkages-never') {
            // Do nothing
        }
        else if (darkages =='darkages-1') {
            for (var card of chosenCards) {
                if (card.set == 'darkages') {
                    shelters.classList.remove('hidden');
                    break;
                }
            }
        }
        else if (darkages =='darkages-proportional') {
            var toCheck = Math.floor(Math.random() * 10);
            if (chosenCards[toCheck].set == 'darkages') {
                shelters.classList.remove('hidden');
            }
        }
        else if (darkages =='darkages-always') {
            shelters.classList.remove('hidden');
        }
    }


    // get the number of horizontals that will be used in this
    // Dominion game. It may vary when 'random' is selected.
    function getHorizontalCount(ownedCards, horizontals) {
        var horizontalCount;
        var numOwned = ownedCards.filter(isHorizontal).length;
        if (numOwned == 0) {
            return 0;
        }
        horizontalCount = horizontals.slice(-1);
        if (isNaN(horizontalCount)) {
            horizontalCount = Math.floor(Math.random() * 3);
        }
        return parseInt(horizontalCount);
    }


    // For a card, get a map with sets/costs/types only the card satisfies.
    // The point - without this card, user-specified cost/set/type conditions
    // are no longer met. A replacement for that card will have to meet them all!
    function getOnlyHere(cards, cardIndex, userInput, horizontalCount) {
        // Step 1: for each requirement, get sum of requirements for all cards
        // chosen so far except this particular card.
        var onlyHere = {
            'Sets': '',
            'Costs': '',
            'Types': ''
        }

        for (var i in cards) {
            if (i == cardIndex) {
                continue;
            }
            onlyHere['Sets'] += setsItRemoves(cards[i], userInput['sets']);
            onlyHere['Costs'] += costsItRemoves(cards[i], userInput['costs']);

            onlyHere['Types'] += typesItRemoves(cards[i], 'H'.repeat(chosen.horizontalCount));
        }

        // Step 2: allMetRequirements - requirementOfThisCard

        onlyHere['Sets'] = charsRemoved(userInput['sets'], onlyHere['Sets']);
        onlyHere['Costs'] = charsRemoved(userInput['costs'], onlyHere['Costs']);
        onlyHere['Types'] = charsRemoved('H'.repeat(horizontalCount), onlyHere['Types']);
        return onlyHere;
    }


    function unbanAllReqs(onlyHere, chosen) {
        for (var word of Object.keys(onlyHere)) {
            for (ch of onlyHere[word]) {
                chosen['banned' + word].delete(ch.toLowerCase());
            }
        }
    }


    function banAllReqs(onlyHere, chosen) {
        for (var word of Object.keys(onlyHere)) {
            var set = chosen['banned' + word];
            for (ch of onlyHere[word]) {
                set.add(ch.toLowerCase());
            }
        }
    }


    // TODO: hold CTRL for swipe without conditions
    function swipe(figure, chosen, userInput) {
        var figureIndex = figure.id.match(/\d+/)[0];

        var cardName = figure.querySelector('figcaption').textContent;
        var cardIndex = chosen.cards.findIndex(c => c['name'] == cardName);
        var oldCard = chosen.cards[cardIndex];

        if (oldCard.name == 'Black Market') {
            for (var k of Object.keys(chosen.roles)) {
                if (chosen.roles[k] == 'black market') {
                    delete chosen.roles[k];
                }
            }
        }

        onlyHere = getOnlyHere(chosen.cards, cardIndex, userInput, chosen.horizontalCount);

        unbanAllReqs(onlyHere, chosen);
        var oldRole = (chosen.roles[cardName]);
        var everything = [chosen, userInput, onlyHere, cardIndex, oldRole];
        newCard = chosen.randomPool.find(passesSwipeTests, everything);
        banAllReqs(onlyHere, chosen);

        if (newCard) {
            chosen.cards[cardIndex] = newCard;
            chosen.roles[newCard.name] = 'normal';
            if (chosen.roles[oldCard.name] == 'bane') {
                chosen.roles[newCard.name] = 'bane';
            }
            chosen.roles[oldCard.name] = 'swiped';
            paintCard(newCard, figureIndex, chosen.roles);
        }
        return chosen;
    }


    function passesSwipeTests(card, thisArg) {
        var oldRole = this[4];
        var replac = this[3]; // index of replaced card
        var requirements = this[2];
        var userInput = this[1];
        var chosen = this[0];

        if (chosen.roles[card.name]) {
            return false;
        }
        if (cardIsBanned(card, chosen, userInput['newbies'])) {
            return false;
        }
        if (!hasAllRequirements(card, requirements)) {
            return false;
        }
        if (oldRole == 'bane') {
            if (card.cost != 2 && card.cost != 3) {
                return false;
            }
        }
        var cards = chosen.cards;
        var cards = cards.slice(0, replac).concat([card]).concat(cards.slice(replac + 1));
        if (!conditionsPassed(cards, userInput)) {
            return false;
        }
        return true;
    }


    function hasAllRequirements(card, requirements) {
        var setsRemoved = setsItRemoves(card, userInput['sets']);
        if (charsRemoved(requirements['Sets'], setsRemoved)) {
            return false;
        }
        var costsRemoved = costsItRemoves(card, userInput['costs']);
        if (charsRemoved(requirements['Costs'], costsRemoved)) {
            return false;
        }
        var typesRemoved = typesItRemoves(card, 'H'.repeat(chosen.horizontalCount));
        if (charsRemoved(requirements['Types'], typesRemoved)) {
            return false
        }
        return true;
    }


    function clickHandler(evnt) {
        var clicked = evnt.currentTarget;
        if (clicked.id == 'btn-randomize') {
            chosen = showKingdom(userInput);
            lastFocusedInput.focus();
        }
        else if (clicked.type == 'radio') {
            userInput[clicked.name] = clicked.id;
        }
        else if (clicked.type == 'checkbox') {
            userInput[clicked.id] = clicked.id;
        }
        else if (clicked.id.startsWith('card-')) {
            chosen = swipe(clicked, chosen, userInput);
            lastFocusedInput.focus();
        }
    }


    function normalTextInput(evnt) {
        var inputId = evnt.currentTarget.id;
        userInput[inputId] = document.getElementById(inputId).value;
        userInput.recalculate();
    }


    function swipeTextInput(evnt) {
        if (evnt.keyCode == 13) {
            var val = evnt.currentTarget.value;
            if (!isNaN(val)) {
                val = val - 1 >= 0 ? val -1 : 9;
            }
            else if (val == 'a') {
                val = 10;
            }
            else {
                val = 11;
            }
            var cards = document.querySelectorAll("figure[id^='card-']:not(.hidden)");
            val = Math.min(cards.length - 1, val);
            if (val > -1) {
                var toSwipe = document.getElementById('card-' + val);
                chosen = swipe(toSwipe, chosen, userInput);
            }
        }
    }


    function keyUpHandler(evnt) {
        if (evnt.keyCode == 13) {
            if (evnt.currentTarget.id == 'swipe') {
                swipeTextInput(evnt);
                return;
            }
            else {
                chosen = showKingdom(userInput);
            }
        }
    }


    function rememberFocus(evnt) {
        if (evnt.currentTarget.tagName == 'INPUT') {
            lastFocusedInput = evnt.currentTarget;
        }
    }


    // set global variables and attach event listeners:
    var userInput = getUserInput();
    var chosen;
    var lastFocusedInput;

    for (var input of document.querySelectorAll('input')) {
        input.addEventListener('keyup', keyUpHandler);
        input.addEventListener('blur', rememberFocus);
    }

    for (var clickable of document.querySelectorAll("input:not([type='text'])")) {
        clickable.addEventListener('click', clickHandler);
    }

    for (var text of document.querySelectorAll("input[type='text']")) {
        text.addEventListener('input', normalTextInput);
    }

    document.getElementById('btn-randomize').addEventListener('click',
            clickHandler);

    for (var fig of document.getElementsByTagName('figure')) {
        fig.addEventListener('click', clickHandler);
    }


}(EXISTING_CARDS));
