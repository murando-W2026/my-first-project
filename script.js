function createToggleButton(table) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = "表を表示";

    button.addEventListener("click", function() {
        if (table.style.display === "none") {
            table.style.display = "block";
            button.textContent = "表を非表示";
        } else {
            table.style.display = "none";
            button.textContent = "表を表示";
        }
    });

    return button;
}

function createTocBranch(label, targetId, children = []) {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.textContent = label;
    link.href = "#" + targetId;

    li.appendChild(link);

    for (const child of children) {
        li.appendChild(child);
    }

    ul.appendChild(li);

    return ul;
}

function createNounCard(nounType, nounData) {
    const section = document.createElement("section");
    section.classList.add("declension-card");

    const heading = document.createElement("h4");
    heading.textContent = nounType;

    const word = document.createElement("p");
    word.textContent = nounData.word;
    word.classList.add("greek-word");

    const table = createNounTable(nounData.declension);
    table.style.display = "none";

    const button = createToggleButton(table);

    section.appendChild(heading);
    section.appendChild(word);
    section.appendChild(button);
    section.appendChild(table);

    return section;
}

function createNounTable(declension) {
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const baseRow = document.createElement("tr");

    const baseCase = document.createElement("th");
    baseCase.textContent = "格";
    baseCase.scope = "col";

    const baseSg = document.createElement("th");
    baseSg.textContent = "単数";
    baseSg.scope = "col";

    const basePl = document.createElement("th");
    basePl.textContent = "複数";
    basePl.scope = "col";

    baseRow.appendChild(baseCase);
    baseRow.appendChild(baseSg);
    baseRow.appendChild(basePl);
    thead.appendChild(baseRow);

    for (const caseName of Object.keys(declension)) {
        const row = document.createElement("tr");

        const caseCell = document.createElement("th");
        caseCell.textContent = caseName;
        caseCell.scope = "row";

        const sgCell = document.createElement("td");
        sgCell.textContent = declension[caseName].sg;
        sgCell.classList.add("greek");

        const plCell = document.createElement("td");
        plCell.textContent = declension[caseName].pl;
        plCell.classList.add("greek");

        row.appendChild(caseCell);
        row.appendChild(sgCell);
        row.appendChild(plCell);
        tbody.appendChild(row);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}

function createPronounCard(pronounType, pronounData) {
    const section = document.createElement("section");

    const heading = document.createElement("h4");
    heading.textContent = pronounType;

    if (pronounData.id === "pronoun-demonstrative") {

        for (const distinction of Object.keys(pronounData)) {
            
            if (distinction === "id"){
                continue;
            }

            const distinctionData = pronounData[distinction];

            const distinctionSection = createDemonstrativeCard(distinction, distinctionData);

            section.appendChild(distinctionSection);
        }
        
        return section;
    } else {

        section.classList.add("declension-card");

        const word = document.createElement("p");
        word.textContent = pronounData.word;
        word.classList.add("greek-word");

        const table = createPronounTable(pronounData.declension);
        table.style.display = "none";

        const button = createToggleButton(table);

        section.appendChild(word);
        section.appendChild(button);
        section.appendChild(table);

        return section;
    }
}

function createDemonstrativeCard(distinction, distinctionData) {

    const section = document.createElement("section");
    section.classList.add("declension-card");

    const heading = document.createElement("h5");
    heading.textContent = distinction;

    const word = document.createElement("p");
    word.textContent = distinctionData.word;
    word.classList.add("greek-word");

    const table = createPronounTable(distinctionData.declension);
    table.style.display = "none";

    const button = createToggleButton(table);

    section.appendChild(heading);
    section.appendChild(word);
    section.appendChild(button);
    section.appendChild(table);

    return section;
}

function createPronounTable(declension) {
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const genderRow = document.createElement("tr");

    const baseCase = document.createElement("th");
    baseCase.textContent = "格";
    baseCase.rowSpan = 2;
    baseCase.scope = "col";

    const genderM = document.createElement("th");
    genderM.textContent = "男性";
    genderM.colSpan = 2;
    baseCase.scope = "col";

    const genderF = document.createElement("th");
    genderF.textContent = "女性";
    genderF.colSpan = 2;
    baseCase.scope = "col";

    const genderN = document.createElement("th");
    genderN.textContent = "中性";
    genderN.colSpan = 2;
    baseCase.scope = "col";

    genderRow.appendChild(baseCase)
    genderRow.appendChild(genderM)
    genderRow.appendChild(genderF)
    genderRow.appendChild(genderN)

    thead.appendChild(genderRow)

    const baseRow = document.createElement("tr");

    for (let i = 0; i < 3 ; i++) {
        const baseSg = document.createElement("th");
        baseSg.textContent = "単数";
        baseSg.scope = "col";

        const basePl = document.createElement("th");
        basePl.textContent = "複数";
        basePl.scope = "col";
        
        baseRow.appendChild(baseSg);
        baseRow.appendChild(basePl);
    }
    
    thead.appendChild(baseRow);

    for (const caseName of Object.keys(declension)) {
        const row = document.createElement("tr");

        const caseCell = document.createElement("th");
        caseCell.textContent = caseName;
        caseCell.scope = "row";

        row.appendChild(caseCell);
        for (const gender of Object.keys(declension[caseName])) {
            const sgCell = document.createElement("td");
            sgCell.textContent = declension[caseName][gender].sg;
            sgCell.classList.add("greek");

            const plCell = document.createElement("td");
            plCell.textContent = declension[caseName][gender].pl;
            plCell.classList.add("greek");

            row.appendChild(sgCell);
            row.appendChild(plCell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}

function createVerbCard (verbType, verbId, verbData) {

    const section = document.createElement("section");
    section.classList.add("conjugation-card");

    const heading = document.createElement("h4");
    heading.textContent = verbType;
    heading.id = verbId

    const word = document.createElement("p");
    word.textContent = verbData.word;
    word.classList.add("greek-word");

    section.appendChild(heading);
    section.appendChild(word);

    const tenseTocBranches = [];

    for (const tense of Object.keys(verbData)) {
        if (tense === "id" || tense === "word") {
            continue;
        }

        const tenseId = heading.id + "-" + tense;

        const voices = verbData[tense];

        const tenseSection = createTenseSection(tense, tenseId, voices);

        const tenseTocBranch = createTocBranch(tense, tenseId);

        section.appendChild(tenseSection);
        tenseTocBranches.push(tenseTocBranch);
    }

    const verbTocBranch = createTocBranch(verbType, verbId, tenseTocBranches)

    return {
        section: section,
        tocBranch: verbTocBranch
    };
}

function createTenseSection(tense, tenseId, voices) {

    const section = document.createElement("section");
    section.classList.add("subconjugation-card")
                            
    const heading = document.createElement("h5");
    heading.textContent = tense;
    heading.id = tenseId;

    section.appendChild(heading);

    for (const voice of Object.keys(voices)) {

        const conjugation = voices[voice];

        const voiceSection = createVoiceSection(voice, conjugation);

        section.appendChild(voiceSection);
    }

    return section;
}

function createVoiceSection(voice, conjugation) {
    const section = document.createElement("section");
    section.classList.add("subsubconjugation-card")

    const heading = document.createElement("h6");
    heading.textContent = voice;

    const table = createVerbTable(conjugation);
    table.style.display = "none";

    const button = createToggleButton(table);

    section.appendChild(heading);
    section.appendChild(button);
    section.appendChild(table);

    return section;
}

function createVerbTable(conjugation) {
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const baseRow = document.createElement("tr");

    const basePerson = document.createElement("th");
    basePerson.textContent = "人称";
    basePerson.scope = "col";

    const baseSg = document.createElement("th");
    baseSg.textContent = "単数";
    baseSg.scope = "col";

    const basePl = document.createElement("th");
    basePl.textContent = "複数";
    basePl.scope = "col";

    baseRow.appendChild(basePerson);
    baseRow.appendChild(baseSg);
    baseRow.appendChild(basePl);
    thead.appendChild(baseRow);

    for (const person of Object.keys(conjugation)) {

        const row = document.createElement("tr");

        const personCell = document.createElement("th");
        personCell.textContent = person === "inf" ? "不定詞" : person;
        personCell.scope = "row";

        row.appendChild(personCell);

        if (person === "inf") {
            const infCell = document.createElement("td");
            infCell.textContent = conjugation[person];
            infCell.classList.add("greek", "infinitive");
            infCell.colSpan = 2;

            row.appendChild(infCell);
        }
        else {
            const sgCell = document.createElement("td");
            sgCell.textContent = conjugation[person].sg;
            sgCell.classList.add("greek");

            const plCell = document.createElement("td")
            plCell.textContent = conjugation[person].pl;
            plCell.classList.add("greek");

            row.appendChild(sgCell);
            row.appendChild(plCell);
        };
        
        tbody.appendChild(row);
    }

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
}

fetch("tables.json")
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById("tables");
        const index = document.getElementById("table-of-contents");

        const maincategories = Object.keys(data) 

        for (const maincategory of maincategories) {

            const categories = Object.keys(data[maincategory]);

            // console.log(maincategory)

            const heading2 = document.createElement("h2");
            heading2.textContent = maincategory;
            heading2.id = data[maincategory].id;

            // console.log(heading2.id)

            container.appendChild(heading2);

            const mainUl = document.createElement("ul");
            const mainLi = document.createElement("li");
            const mainLink = document.createElement("a");
            mainLink.textContent = maincategory;
            mainLink.href = "#" + data[maincategory].id;

            mainLi.appendChild(mainLink)
            mainUl.appendChild(mainLi);

            // console.log(mainList)
            
            for (const category of categories) {

                // console.log(category)

                if (category === "id") {
                    continue;
                }

                const subcategories = Object.keys(data[maincategory][category]);

                // console.log(subcategories);

                const section1 = document.createElement("section")

                const heading3 = document.createElement("h3");
                heading3.textContent = category;
                heading3.id = data[maincategory][category].id;

                // console.log(heading3.id)

                section1.appendChild(heading3);
                section1.classList.add("card")

                const subUl = document.createElement("ul");
                const subLi = document.createElement("li");
                const subLink = document.createElement("a");
                subLink.textContent = category;
                subLink.href = "#" + data[maincategory][category].id;
                subLi.appendChild(subLink);
                subUl.appendChild(subLi);

                mainLi.appendChild(subUl);

                if (data[maincategory].id === "pronoun" || data[maincategory].id === "adjective") {
                    const itemData = data[maincategory][category]

                    if (itemData.id === "adv_com_sup") {
                        continue;
                    }
                    const pronounSection = createPronounCard(category, itemData);

                    section1.appendChild(pronounSection);
                    container.appendChild(section1)
                    continue;
                }

                for (const subcategory of subcategories) {

                    if (subcategory === "id") {
                        continue;
                    }

                    const itemData = data[maincategory][category][subcategory];

                    if (data[maincategory].id === "noun") {
                        const nounSection = createNounCard(subcategory, itemData);

                        section1.appendChild(nounSection);

                    } else if (data[maincategory].id === "verb") {
                        const verbId = data[maincategory][category][subcategory].id
                        const verbResult = createVerbCard(subcategory, verbId, itemData);

                        section1.appendChild(verbResult.section);
                        subLi.appendChild(verbResult.tocBranch);
                    }
                }
                container.appendChild(section1)
            }
            // console.log(mainList)
            index.appendChild(mainUl)
        }
    });