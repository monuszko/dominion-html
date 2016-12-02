Dominion.html
=============

A compact setup randomizer for the card game "Dominion".
Newest version always at https://github.com/monuszko/dominion-html

.. contents::

Requirements
------------

You need a quite modern, standards-friendly web browser, because
``Dominion.html`` uses modern Javascript (ES2015). This typically means
Firefox, Chrome or Edge, and probably Opera. Supporting older / less known
browsers like Internet Explorer, Konqueror would force a lot of clunky code.
Safari will likely get there eventually, but there are no plans to update IE.

Otherwise it's very multi-platform, with no browser-specific code or
non-standard JS. It's just HTML, CSS, JS (no jQuery etc.). A short Python
script builds the single file version.

Features
--------

*  Support for all expansions up to Empires. 2nd edition not yet supported.
*  100% client-side application, no server, no internet connection required.
*  Single file version (separate files on github).
*  Fits on a single screen. No Whack-A-Mole with checkboxes.
*  Smart counter system for attacks based on tagged cards.
*  You can request a number of cards of specific cost, set, etc. Even an Event
   (from Adventures, Empires) might rise up to the task.
*  Swipe function (click on a card to replace it with another card). The set
   will be valid with the new card (costs, attack counters etc). You can even
   replace events, landmarks, bane. You won't see the swiped card again until
   you refresh page.
*  Promos.
*  Black Market deck generation (you decide how many cards).
*  Bane for Young Witch.

   *  Even if it's in the Black Market deck!

*  Configurable selection methods for events/landmarks, shelters, colony...
*  Card's set is marked with colored outline.
*  Card data kept in a readable JSON file. The development version includes
   dynamically-generated documents to aid with tagging cards.
*  Pretty clean and well-structured code. It might not be at the moment you're
   reading this, but it's regularly cleaned and refactored.


Usage
-----

Hover mouse over labels for hints. Hover over cards to see their text.

Enter letters representing Dominion expansions into the first field.

In the same manner, you can enter letters into "Per set" field. The randomizer
will make sure the set has that many cards from that set. For example, ``sss``
means ``at least`` 3 cards from Seaside, while ``DD`` means ``exactly`` 2 cards
from Dark Ages.

Enter numbers into the "Per cost" field to make sure that many cards costing
whatever-you-entered are present. You can use ``p`` for potions, ``d`` for
debt. Also works with uppercase.

In the "to swipe" field, enter the number of the card to replace with something
else. It respects cost, set requirements of other fields, works on bane, even
events/landmarks. You may also just click on a card to replace it.

"Black Market size" specifies the number of cards to include in the Black
Market deck. The deck is displayed when you hover over the Black Market card.

The "Newbie friendly" checkbox just filters out the cards with the
"complicated" tag.

Once done, click on "Randomize" or press Enter.

Design
------

Many Dominion randomizers require a server of some sort, because that's what
the programmer was familiar with. This one absolutely does not, it runs
fine offline. It's 100% stand-alone, client-side and you can put it on any
device that supports copying files and HTML documents. Which doesn't include
an iPhone.

The interface is optimized for keyboard and long term use. It uses as little
space as possible, and is highly scalable, although it may be a little too much
typing on a cell phone.

Card data is kept in a (separate, if you have the dev version) JSON file.
No card images whatsover - partially to avoid copyright issues, partially for
extra challenge.

Countering attacks is based on tags. For instance, cards with ``junk_attack``
tag might be countered not just by Moat/Lighthouse, but also by ``trasher``
cards, and special cases like ``counters_junk``, which would be Ambassador.
It's fairly easy to customize in the JSON file, and there are dynamically
generated overviews in the ``tools/`` directory, but yes, it's time-consuming.
On the upside, events and landmarks are fully capable of countering attacks,
as long as they have the right tags assigned.

From programming point of view, the algorithm is:

0. Randomize the card pool.
1. Keep selecting cards as long as they satisfy at least 1 requirement (cost,
   set, newbieness etc). Everything that can be checked on a per-card basis
   is checked on the fly, for performance.
2. Pad the rest up to standard 10 with random cards.
3. Check complex conditions that rely on more than one card (for example if
   each attack has an appropriate counter). Reject the whole set if not.

Known bugs
----------

Currently none !

Author
------

Marek Onuszko (marek dot onuszko at gmail dot com).
https://github.com/monuszko/
