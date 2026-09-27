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

function createTenseSection(tense, voices) {

    const section = document.createElement("section");
    section.classList.add("subconjugation-card")
                            
    const heading = document.createElement("h5");
    heading.textContent = tense;

    section.appendChild(heading);

    // console.log(voices);

    for (const voice of Object.keys(voices)) {

        const conjugation = voices[voice];

        console.log(voices[voice]);

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

                for (const subcategory of subcategories) {

                    if (subcategory === "id") {
                        continue;
                    }

                    const itemData = data[maincategory][category][subcategory];

                    if (data[maincategory].id === "noun") {
                        const nounSection = createNounCard(subcategory, itemData);

                        section1.appendChild(nounSection);
                        continue;
                    }

                    const section2 = document.createElement("section");

                    const heading4 = document.createElement("h4");
                    heading4.textContent = subcategory;

                    const word = document.createElement("p");
                    word.textContent = data[maincategory][category][subcategory].word;
                    word.classList.add("greek-word");
                    
                    // 動詞処理
                    if (data[maincategory].id === "verb") {

                        if (subcategory === "id") {
                            continue;
                        }

                        section2.classList.add("conjugation-card");

                        section2.appendChild(heading4);
                        section2.appendChild(word);
    
                        heading4.id = data[maincategory][category][subcategory].id
                        const subsubUl = document.createElement("ul");
                        const subsubLi = document.createElement("li");
                        const subsubLink = document.createElement("a");
                        subsubLink.textContent = subcategory;
                        subsubLink.href = "#" + data[maincategory][category][subcategory].id;
                        subsubLi.appendChild(subsubLink);
                        subsubUl.appendChild(subsubLi);

                        subLi.appendChild(subsubUl);

                        const subsubcategories = Object.keys(data[maincategory][category][subcategory]);

                        for (const subsubcategory of subsubcategories) {

                            if (subsubcategory === "id" || subsubcategory === "word") {
                                continue;
                            }

                            const tenseId = heading4.id + "-" + subsubcategory;
                            // tense.id = tenseId;
                            
                            const subsubsubUl = document.createElement("ul");
                            const subsubsubLi = document.createElement("li");
                            const subsubsubLink = document.createElement("a");
                            subsubsubLink.textContent = subsubcategory;
                            subsubsubLink.href = "#" + tenseId;
                            subsubsubLi.appendChild(subsubsubLink);
                            subsubsubUl.appendChild(subsubsubLi);

                            subsubLi.appendChild(subsubsubUl);

                            const voices = data[maincategory][category][subcategory][subsubcategory];

                            const tenseSection = createTenseSection(subsubcategory, voices);

                            section2.appendChild(tenseSection);
                        }
                    }
                    section1.appendChild(section2);
                }
                container.appendChild(section1)
            }
            // console.log(mainList)
            index.appendChild(mainUl)
        }
    });