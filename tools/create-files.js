/* eslint-disable */

const {
    readFileSync,
    writeFileSync
} = require("fs");

const FILE = {
    // DIRECTORY: "./src/asset/icons/icon-directory.json",
    EVERY: "./src/asset/categories/every.json",
    SPLITS: "./src/asset/splits.txt",
    ICONS: "./src/asset/icons/icons.ts"
}

// TODO: figure out good way to have tools and web share common code

function parseSplitsDefinitions() {
    const splits = readFileSync(FILE.SPLITS, { encoding: "utf8" });
    const SPLITS_DEFINITIONS_REGEXP =
        /\[Description\("(?<description>.+)"\), ToolTip\("(?<tooltip>.+)"\)\]\s+(?<id>\w+),/g;
    const DESCRIPTION_NAME_REGEXP = /(?<name>.+)\s+\((?<qualifier>.+)\)/;
    const matches = splits.matchAll(SPLITS_DEFINITIONS_REGEXP);
    const definitions = new Map();
    for (const match of matches) {
        if (!match.groups) {
            throw new Error("RegExp match must have groups");
        }

        const {
            description,
            id,
            tooltip,
        } = match.groups;

        const desMatch = DESCRIPTION_NAME_REGEXP.exec(description);
        if (!desMatch) {
            throw new Error(`Invalid Description: ${description}`);
        }
        if (!desMatch.groups) {
            throw new Error("RegExp match must have groups");
        }

        const { name, qualifier, } = desMatch.groups;



        definitions.set(id, {
            id,
            qualifier,
        });
    }

    return definitions;
}

const Splits = [...parseSplitsDefinitions().values()];

const every = {
    "splitIds": Splits.map(({ id }) => id),
    "ordered": true,
    "endTriggeringAutosplit": false,
    "gameName": "Hollow Knight Category Extensions",
    "categoryName": "EVERY AUTOSPLIT",
    "variables": {
        "platform": "PC",
        "patch": "1.4.3.2"
    }
}

function createEvery() {
    const output = JSON.stringify(every, null, 4);
    writeFileSync(FILE.EVERY, output);
}

const NEW_ID_MAP = {
    "HasDelicateFlower": "DelicateFlower",
    "PaleLurkerKey": "SimpleKey",
    "Mask2": "Mask1",
    "Mask3": "Mask1",
    "Mask4": "Mask1",
    "MaskFragment5": "MaskFragment1",
    "MaskFragment9": "MaskFragment1",
    "MaskFragment13": "MaskFragment1",
    "MaskFragment6": "MaskFragment2",
    "MaskFragment10": "MaskFragment2",
    "MaskFragment14": "MaskFragment2",
    "MaskFragment7": "MaskFragment3",
    "MaskFragment11": "MaskFragment3",
    "MaskFragment15": "MaskFragment3",
    "Vessel2": "Vessel1",
    "Vessel3": "Vessel1",
    "VesselFragment2": "VesselFragment1",
    "VesselFragment4": "VesselFragment1",
    "VesselFragment5": "VesselFragment1",
    "VesselFragment7": "VesselFragment1",
    "VesselFragment8": "VesselFragment1",
    "CrystalGuardian": "CrystalGuardian1",
    "CrystalGuardian2": "CrystalGuardian1",
    "EnragedGuardian": "CrystalGuardian1",
    "GreyPrince": "GreyPrinceZote",
    "Sly": "SlyNailsage",
    "Hornet2": "Hornet1",
    "FailedKnight": "FalseKnight",
    "FailedChampion": "FalseKnight",
    "LostKin": "BrokenVessel",
    "BlackKnight": "WatcherKnights",
    "SoulTyrant": "SoulMaster",
    "MegaMossCharger": "MassiveMossCharger",
    "OroMatoNailBros": "MatoOroNailBros",
    "Dreamer1": "Dreamer",
    "Dreamer2": "Dreamer",
    "Dreamer3": "Dreamer",
    "Hegemol": "Herrah"
};

function getUrl(id, qualifier) {
    if (id === "DungDefenderIdol") {
        return getUrl("KingsIdol", "Relic");
    }

    if (qualifier === "Essence") {
        const match = id.match(/(?<name>.+)Essence/);
        if (match) {
            return getUrl(match.groups.name, "Boss");
        }
    }

    if (qualifier === "Pantheon") {
        const match = id.match(/(?<name>.+)P/);
        if (match) {
            return getUrl(match.groups.name, "Boss");
        }
    }

    if (qualifier === "Charm Notch") {
        return getUrl("CharmNotch", "Item");
    }

    if (qualifier === "Event") {
        switch (id) {
            case "PreGrimmShop":               return getUrl("TroupeMasterGrimm", "Boss");
            case "CanOvercharm":               return getUrl("Charmed", "Achievement");
            case "UnchainedHollowKnight":      return getUrl("HollowKnightBoss", "Boss");
            case "WatcherChandelier":          return getUrl("WatcherChandelier", "Misc");
            case "CityGateOpen":               return getUrl("CityKey", "Item");
            case "FlowerQuest":                return getUrl("DelicateFlower", "Item");
            case "FlowerRewardGiven":          return getUrl("Solace", "Achievement");
            case "HappyCouplePlayerDataEvent": return getUrl("HappyCouple", "Achievement");
            case "AllCharmNotchesLemm2CP":     return getUrl("Lemm", "Misc");
            case "NailsmithKilled":            return getUrl("Purity", "Achievement");
            case "NailsmithSpared":            return getUrl("HappyCouple", "Achievement");
            case "NightmareLantern":           return getUrl("Flame", "Misc");
            case "NightmareLanternDestroyed":  return getUrl("Banishment", "Achievement");
            case "HollowKnightDreamnail":      return getUrl("HollowKnightBoss", "Boss");
            case "SeerDeparts":                return getUrl("Ascension", "Achievement");
            case "SpiritGladeOpen":            return getUrl("Attunement", "Achievement");
            case "BeastsDenTrapBench":         return getUrl("Bench", "Misc");
        }
    }

    if (qualifier === "Trial") {
        switch (id) {
            case "ColosseumBronze": return getUrl("Warrior", "Achievement")
            case "ColosseumSilver": return getUrl("Conqueror", "Achievement")
            case "ColosseumGold":   return getUrl("Fool", "Achievement")
            case "Pantheon1":       return getUrl("Brotherhood", "Achievement")
            case "Pantheon2":       return getUrl("Inspiration", "Achievement")
            case "Pantheon3":       return getUrl("Focus", "Achievement")
            case "Pantheon4":       return getUrl("SoulAndShade", "Achievement")
            case "Pantheon5":       return getUrl("EmbraceTheVoid", "Achievement")
        }
    }

    if (qualifier === "Completed") {
        switch (id) {
            case "PathOfPain": return getUrl("SealOfBinding", "Item");
        }
    }

    if (qualifier === "Mini Boss" || qualifier === "Killed") {
        switch (id) {
            case "AspidHunter":          return getUrl("AspidHunter", "Enemy");
            case "MossKnight":           return getUrl("MossKnight", "Enemy");
            case "MushroomBrawler":      return getUrl("ShrumalOgre", "Enemy");
            case "Zote1":                return getUrl("Zote", "Enemy");
            case "Zote2":                return getUrl("Zote", "Enemy");
            case "ZoteKilled":           return getUrl("Zote", "Enemy");
            case "Aluba":                return getUrl("Aluba", "Enemy");
            case "HuskMiner":            return getUrl("HuskMiner", "Enemy");
            case "GreatHopper":          return getUrl("GreatHopper", "Enemy");
            case "GorgeousHusk":         return getUrl("GorgeousHusk", "Enemy");
            case "MenderBug":            return getUrl("MenderBug", "Enemy");
            case "killedSanctumWarrior": return getUrl("SoulWarrior", "Boss");
            case "killedSoulTwister":    return getUrl("SoulTwister", "Enemy");
        }
    }

    if (qualifier === "Stag Station") {
        return getUrl("Stag", "Misc");
    }

    if (qualifier === "Area") {
        switch (id) {
            case "Abyss":                 return getUrl("ShadowCreeper", "Enemy");
            case "CityOfTears":           return getUrl("HuskSentry", "Enemy");
            case "Colosseum":             return getUrl("Colosseum", "Misc");
            case "CrystalPeak":           return getUrl("CrystalCrawler", "Enemy");
            case "Deepnest":              return getUrl("Dirtcarver", "Enemy");
            case "DeepnestSpa":           return getUrl("HotSpring", "Misc");
            case "Dirtmouth":             return getUrl("Elderbug", "NPC");
            case "FogCanyon":             return getUrl("Uoma", "Enemy");
            case "ForgottenCrossroads":   return getUrl("Tiktik", "Enemy");
            case "FungalWastes":          return getUrl("Ambloom", "Enemy");
            case "Godhome":               return getUrl("Godseeker", "Misc");
            case "Greenpath":             return getUrl("Mosscreep", "Enemy");
            case "Hive":                  return getUrl("Hiveling", "Enemy");
            case "InfectedCrossroads":    return getUrl("FuriousVengefly", "Enemy");
            case "KingdomsEdge":          return getUrl("PrimalAspid", "Enemy");
            case "QueensGardens":         return getUrl("SpinyHusk", "Enemy");
            case "RestingGrounds":        return getUrl("Seer", "Misc");
            case "RoyalWaterways":        return getUrl("Flukefey", "Enemy");
            case "TeachersArchive":       return getUrl("ChargedLumafly", "Enemy");
            case "WhitePalace":           return getUrl("Wingmould", "Enemy");
            case "WhitePalaceSecretRoom": return getUrl("Kingsmould", "Enemy");
        }
    }

    if (qualifier === "Transition") {
        switch (id) {
            case "BasinEntry":                   return getUrl("Abyss", "Area");
            case "BlueLake":                     return getUrl("Witness", "Achievement");
            case "CrystalPeakEntry":             return getUrl("CrystalPeak", "Area");
            case "EnterAnyDream":                return getUrl("DreamNail", "Skill");
            case "FogCanyonEntry":               return getUrl("FogCanyon", "Area");
            case "EnterGreenpath":
            case "EnterGreenpathWithOvercharm":  return getUrl("Greenpath", "Area");
            case "HiveEntry":                    return getUrl("Hive", "Area");
            case "KingsPass":
            case "KingsPassEnterFromTown":       return getUrl("Vengefly", "Enemy");
            case "KingdomsEdgeEntry":
            case "KingdomsEdgeOvercharmedEntry": return getUrl("KingdomsEdge", "Area");
            case "EnterNKG":                     return getUrl("NightmareKingGrimm", "Boss");
            case "QueensGardensEntry":           return getUrl("QueensGardens", "Area");
            case "EnterSanctum":
            case "EnterSanctumWithShadeSoul":    return getUrl("Folly", "Enemy");
            case "WaterwaysEntry":               return getUrl("RoyalWaterways", "Area");
        }
    }

    if (qualifier === "NPC") {
        switch (id) {
            case "MetGreyMourner":
            case "GreyMournerSeerAscended": return getUrl("GreyMourner", "NPC");
            case "Lemm2": return getUrl("Lemm", "Misc");
            case "BrummFlame": return getUrl("FlameConsumed", "Misc");
        }
    }

    if (qualifier === "Flame") {
        return getUrl("FlameConsumed", "Misc");
    }

    if (qualifier === "Ore") {
        return getUrl("PaleOre", "Item")
    }

    if (qualifier === "Grub") {
        return getUrl("Grub", "NPC")
    }

    if (qualifier === "Tram") {
        return getUrl("Tram", "Misc");
    }

    if (qualifier === "Toll") {
        return getUrl("Bench", "Misc");
    }

    if (qualifier === "Lever" || qualifier === "Room") {
        return getUrl("WhitePalace", "Area");
    }

    if (id.match(/MrMushroom./)) {
        return getUrl("MrMushroom", "NPC");
    }

    if (id.match(/Tree.+/)) {
        return getUrl("WhisperingRoot", "Misc");
    }

    if (id === "DgateKingdomsEdgeAcid") {
        return getUrl("DreamGate", "Skill");
    }

    if (id === "SoulMasterEncountered") {
        return getUrl("SoulMaster", "Boss");
    }

    const newId = NEW_ID_MAP[id] || id;
    return `./${qualifier}/${newId}.png`;
}

function createIconImports() {
    let output = "/* eslint-disable */\n/* THIS FILE IS AUTOMATICALLY GENERATED */\n";
    for (const { id, qualifier } of Splits) {
        output += `import ${id} from "${getUrl(id, qualifier)}";\n`;
    }

    // console.log(output);
    output += "export default {\n";
    for (const { id } of Splits) {
        output += `    ${id},\n`;
    }
    output += "};\n";


    // console.log(output);
    writeFileSync(FILE.ICONS, output);
}


createEvery();
createIconImports();
