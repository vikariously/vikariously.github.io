# Recipe Style Guide

This is the house style for every recipe in `_recipes/`. It is shared by two writers:
Claude Code (the `Recipe:` prompt in this repo) and Veda's recipe-logging tool, which
reads this file live and hands it to the model that writes the recipe. If you are that
model: these are your instructions. Follow them exactly; where this guide is silent,
copy what the Exemplars (bottom of this file) do.

You are writing for two home cooks who will read the recipe on a phone, mid-cook. Every
ingredient has an amount, every step says what to do and how you know it is done, and
nothing is padded.

---

## 1. The file

* **Location:** `_recipes/<slug>.md`. The page publishes at `/recipes/<slug>/`.
* **Slug:** the title in kebab-case: lowercase, words joined by `-`, apostrophes and
  punctuation dropped, any parenthetical dropped.
  `"Kari's Mac and Cheese"` → `karis-mac-and-cheese`;
  `"Purple Reign (Gimlet / Collins)"` → `purple-reign`.
* **Collision:** if `_recipes/<slug>.md` already exists, add the word that tells the two
  apart (`chili-instant-pot`, `focaccia-sourdough`). Only if no such word exists, append
  `-2`. Never overwrite an existing recipe.
* `z.RECIPE_TEMPLATE.md` is the blank template. It is never published and never edited
  as part of logging a recipe.

## 2. Frontmatter

The frontmatter is YAML between `---` lines, in exactly this order and shape:

```yaml
---
title: "Pumpkin Bread Mini-Loaves"
# image: 
#   path: /images/pumpkin-bread-mini-loaves-lg.png
#   thumbnail: /images/pumpkin-bread-mini-loaves-sm.png
#  caption: "CAPTION"
categories:
  - Breakfast
#  - Mains
#  - Sides
#  - Appetizers
#  - Snacks
#  - Salads
#  - Sauces
  - Bread
#  - Sweets
#  - Cocktails
#  - Syrups
tags:
#  - Chicken
#  - Beef
#  - Pork
#  - Bacon
#  - Sausage
#  - Turkey
#  - Fish
#  - Salmon
#  - Veg
#  - Vegetarian/Vegan Friendly
#  - Tofu
#  - Pasta
#  - Soup
#  - "Liquor: Whiskey"
#  - "Liquor: Gin"
#  - "Liquor: Rum"
#  - "Liquor: Vodka"
#  - "Liquor: Tequila"
#  - InstantPot
#  - Slow Cooker
#  - EZ-Freeze
published: true
---
```

Rules:

* **`title`** is always in double quotes, in Title Case.
* **`image`** is always the commented-out block shown above, with the slug filled into
  both paths. Never uncomment it and never invent an image path. Evan adds photos by
  hand later and uncomments the block himself.
* **`categories` and `tags`** list the WHOLE vocabulary. Each one is either commented out
  (`#  - Name`) or in use (`  - Name`, two-space indent). Uncomment the ones that apply;
  leave every other one in place, commented. Do not delete unused entries.
* Any value containing a colon must be quoted: `"Liquor: Gin"`.
* **`published: true`** always. A recipe that is not ready to publish is not written
  (see section 8). It is never parked as `published: false`.

### The vocabulary: use only what already exists

The vocabulary of categories and tags is **whatever the published recipes in
`_recipes/` and the commented lists in `z.RECIPE_TEMPLATE.md` already use**. Check those
files; the lists in the block above are only the vocabulary **as of 2026-11-22**, shown
for orientation, and the files win if they differ.

* **Never invent a new category or tag**, and never respell an existing one (`InstantPot`
  is one word; `Slow Cooker` is two; `EZ-Freeze` is hyphenated).
* If the recipe really needs a category or tag that does not exist, publish without it
  and **suggest it to the user** as a follow-up ("Want a new `Dessert` tag for this?").
  Adding to the vocabulary is the user's call, never yours.
* Pick categories by what the dish is (`Mains`, `Sides`, `Bread`, `Syrups`). Pick tags by
  its main protein, its liquor, its cooking appliance, or a property like `Soup` or
  `EZ-Freeze` (freezes well). A dish can carry several of each.
* A syrup made for cocktails is `Syrups`. A mixed drink is `Cocktails` plus its
  `"Liquor: …"` tag.

### The Green Room block (cocktails only)

Every `Cocktails` recipe carries one more block, right after `published: true`. The
Green Room (our cocktail menu app) reads it; the recipe site never shows it. Recipes in
any other category never carry it.

```yaml
greenroom:
  shelf: novel        # classic | novel — always present
  makes: 2            # drinks the recipe makes as written; leave the line out when 1
  batch_note: "..."   # optional: a pre-dilution / pitcher note for the batch calculator
```

* **`shelf: classic`** is a classic cocktail recipe, even when it is our own house
  version of it (a Daiquiri, a Gimlet, a Smuggler's Cove punch).
* **`shelf: novel`** is our own unique recipe, or a heavily modified version of a
  regular cocktail (our hibiscus mule).
* If the user says which shelf, use it. If they don't, pick the shelf yourself from the
  two definitions above; Veda asks the user to confirm it.
* **`makes`** counts the drinks the ingredient amounts make as written (4 oz. rum for
  two drinks = `makes: 2`). Leave the line out for a single drink.
* **`batch_note`** only when the source or the user gives one. Never invent it.

## 3. Body order

After the frontmatter, the body goes in exactly this order. Leave one blank line between
blocks.

1. **Blurb.** One short paragraph (2–4 sentences) in a warm first-person-plural voice:
   what the dish is, what makes this version good, and when you'd make it. No headings
   and no "In this recipe…". If the dish has a family or backyard story, it goes here.
2. **`**Total Time:**`** (optional). Include it only when the source gives one. Keep it
   on its own line with a blank line before `**Yield:**`, or Markdown merges the two
   lines into one.
3. **`**Yield:**`**, e.g. `**Yield:** Serves 4` or `**Yield:** 3–4 mini-loaves`.
   Include it whenever the source states a yield or one is obvious from the amounts.
   Leave the line out rather than guess.
4. **`## Ingredients`**
   * One ingredient per line as a `* ` bullet (asterisk + space, never `- `).
   * Format: amount, unit, ingredient, then prep after a comma.
     `* 1 large yellow onion, finely diced`.
   * Order the ingredients as the Directions first use them.
   * Optional items say so: `* 1 star anise pod (optional)`.
   * "To taste" items have no amount: `* Salt & pepper, to taste`.
   * **Sub-groups** are for recipes with distinct components. Use a `#### For the X:`
     heading for each group (`#### For the Bread:`, `#### For the Icing:`), with bullets
     under it. Extras that sit outside the recipe go under a `##### ` heading at the end
     of the list: `##### Optional:` or `##### Serve with any of the following:`.
   * **Cocktails and syrups.** The Green Room does maths on these lines, so:
     * Every line is amount, then unit, then name: `* 2 oz. Empress 1908 Gin`. When a
       line names example bottles, the first one is the reference bottle for strength:
       `* 2 oz. silver rum (e.g. Diplomatico Planas or Planteray 3 Stars)`.
     * **Cocktail order** (instead of order of first use): spirits, then liqueurs and
       vermouths, then syrups and juices, then bitters, then toppers (club soda, tonic),
       then fruit and ice, then garnishes.
     * **Garnishes** are the last bullet(s), ending `, for garnish`:
       `* 1 sprig fresh thyme, for garnish`. A garnish with no countable amount has none:
       `* Freshly grated nutmeg, for garnish`. Name the garnish in the Directions too.
     * **A drink with two serves** (a Gimlet or a Collins) writes one complete
       ingredient list per serve, each under its own `#### Gimlet:` / `#### Collins:`
       heading, never one list with optional lines. Its Directions use the same headings.
     * **A house-made ingredient** (a syrup) is its own `Syrups` recipe, linked from the
       cocktail (`[Thyme Simple Syrup](/recipes/thyme-simple-syrup)`). Never write the
       syrup recipe inside the cocktail.
5. **`## Directions`**
   * **Every** step starts with `1.`. Markdown numbers them, so never write `2.`, `3.`.
   * Put a blank line between steps.
   * Each step is one action or a tight group of actions. Long recipes may open a step
     with a bold label: `1. **Blanch:** Add the green beans…`.
   * Every cooking step gives a time AND a doneness cue where it can: "bake 30–35
     minutes, until a toothpick comes out clean." It must give at least one of them.
   * A recipe with separately cooked components may split its Directions with the same
     `#### For the X:` / `#### Finish and Serve:` sub-headings, each followed by its own
     `1.` steps.
   * An alternate method (Instant Pot vs. slow cooker) goes after the main steps under a
     `##### Instant Pot option:` style heading, as `* ` bullets.
6. **`### Notes`** (only if there are notes). Use `* ` bullets. A bullet may open with a
   bold label: `* **Make ahead:** …`. This is where tips, substitutions, storage, scaling
   and "Changed from the original" go (section 6). Never leave placeholder bullets; if
   there are no notes, leave out the whole section.
7. **`---`** on its own line. This is a horizontal rule that closes every recipe.
8. **Footer**: the source line (section 7), or nothing.

To link to another recipe on the site (a syrup used in a cocktail, say), use its
permalink: `[Demerara Syrup](/recipes/demerara-syrup)`.

## 4. Text formatting

* **Fractions:** always the unicode characters `½ ¼ ¾ ⅓ ⅔ ⅛`, never `1/2`. Mixed
  numbers run together: `1½ cups`, `2⅔ cups`.
* **Ranges:** use an en dash: `30–35 minutes`, `3–4 loaves`. (Older recipes use hyphens.
  Both render fine, but new recipes use the en dash.)
* **Units:** `cup`, `Tbsp`, `tsp`, `lb`, `oz.`, `qt`, `"` for inches (`9x13"`),
  `pinch`, `dash`. Ounces are always `oz.` with the period: never `oz`, `ounce`,
  `ounces`, `fl oz` or `fl. oz.`. Use cans in the form `2 (10¾ oz.) cans condensed soup`.
* **Temperatures:** the first time a step names an oven or cooking temperature, write
  Fahrenheit with Celsius in parentheses: `350°F (175°C)`. Round the Celsius to the
  nearest 5 (325→165, 350→175, 375→190, 400→200, 425→220, 450→230). Later mentions
  of the same temperature may be `°F` alone. Precision temperatures (sous vide,
  candy, meat internal temperature) keep exact Celsius, e.g. `145°F (63°C)`.
* **Emphasis:** `**bold**` for step labels and note labels; `*italics*` sparingly for a
  single word that matters ("a *middle* loaf").
* Ingredient names are lowercase unless they are a brand (`Earth Balance`,
  `Kewpie mayo`).

## 5. Vegan rules

* When a dish is vegan, or becomes vegan with the standard swaps below, tag it
  `Vegetarian/Vegan Friendly`.
* **Butter is always Earth Balance non-dairy butter.** Write the ingredient as
  `Earth Balance (non-dairy butter)`.
* **Dairy milk becomes unsweetened non-dairy milk.**
* **Condensed cream-of soups have no vegan version on the market** (Evan checked,
  2026-11-21). A recipe built on one is NOT vegan: no vegan tag, no "buy a vegan soup"
  note, and never name a soup brand as a vegan option.
* Eggs, honey, gelatin, meat, fish and fish sauce all disqualify a dish unless the
  recipe gives a real swap. Never claim vegan on a guess. If in doubt, leave the tag off
  and ask.

## 6. Modifications to the original

When the user asks for changes ("double it", "use fresh beans", "make it vegan", "less
sugar"):

* **Apply them.** Rewrite the ingredient amounts and the steps so the recipe as written
  is the modified version. Never leave the original amounts with a "but use X instead"
  note.
* **Also record them** as one Notes bullet that starts exactly
  `* Changed from the original: …`, listing what changed, e.g.
  `* Changed from the original: doubled to fit 2 lb of fresh green beans; fresh beans instead of canned.`
* Your own small fixes (unicode fractions, adding °C, splitting a run-on step) are
  formatting, not modifications. Do not list them.

## 7. Source footer

The line after the closing `---` credits the source, in one of exactly three forms:

| Source | Footer line |
|---|---|
| A web page (any URL) | `Original recipe from [Site Name](URL)` |
| A named source with no URL: a cookbook, a person, a recipe card | `Adapted from <source>`, e.g. `Adapted from a recipe card from Ann Meuel` |
| The user's own recipe, or pasted text with no stated source | nothing (the file ends at `---`) |

* `Site Name` is the publication's human name (`Serious Eats`, `Food.com`), not the
  domain and not the article title.
* Strip tracking parameters and `#wprm-…` anchors from the URL.
* Older recipes say "Originally based on recipe from…" or put the source in Notes. New
  recipes use only the three forms above.

## 8. When to stop vs. publish

Only these problems stop a recipe from being published. If one applies, do not write
the file. Tell the user exactly what is missing and ask:

1. An ingredient's quantity is **missing or implausible** (e.g. "salt" in a cure with no
   amount, or "10 cups baking soda"). "To taste" seasonings are fine.
2. A step uses an ingredient that is **not in the ingredient list**.
3. A cooking step has **neither a time nor a doneness cue** ("bake until done" with no
   temperature or time anywhere).
4. The source is **illegible** (an unreadable photo or garbled text).
5. The source contains **no recipe** at all.

**Everything else gets published, and you ask about it afterward.** That covers a missing
yield, an unclear category, a tag that doesn't exist yet, an unknown source, an ambiguous
pan size, or a blurb you had to write from nothing. Make the sensible call, write the
recipe with `published: true`, and list your open questions for the user in your reply
(never inside the recipe file). The user's answers become follow-up edits.

## 9. Exemplars

These four published recipes best show the house style across different kinds of
dish. When this guide is silent, copy what they do:

* `_recipes/keg-house-chili.md`: a main. It shows multiple tags, "to taste" ingredients,
  and an alternate-method `##### Instant Pot option:` block.
* `_recipes/pumpkin-bread-mini-loaves.md`: a baked good. It shows `**Yield:**`,
  `350°F (175°C)`, unicode fractions, time plus doneness cues, and extra category lists
  (`Snacks`, `Bread`).
* `_recipes/plum-simple-syrup.md`: a syrup. It shows the `Syrups` + vegan tags, Notes
  bullets, and an `Original recipe from [Site](URL)` footer.
* `_recipes/purple-reign.md`: a cocktail. It shows the `greenroom` block, two serves
  under `#### Gimlet:` / `#### Collins:`, cocktail ingredient order, `, for garnish`
  lines, and a linked house syrup.

The exemplars predate parts of this vocabulary, so their commented category and tag
lists are shorter than the full list. Copy their style, but always write the full
current list from section 2.
