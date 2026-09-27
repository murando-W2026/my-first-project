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

                    console.log(subcategory);

                    if (subcategory === "id") {
                        continue;
                    }

                    const section2 = document.createElement("section");

                    const heading4 = document.createElement("h4");
                    heading4.textContent = subcategory;

                    const word = document.createElement("p");
                    word.textContent = data[maincategory][category][subcategory].word;
                    word.classList.add("greek-word");

                    //名詞処理
                    if (data[maincategory].id === "noun") {
                        section2.classList.add("declension-card");

                        const declension = data[maincategory][category][subcategory].declension;
                        const cases = Object.keys(declension);
                        
                        const table = document.createElement("table")
                        table.style.display = "none";

                        const thead = document.createElement("thead");
                        const tbody = document.createElement("tbody");
                        
                        const button = document.createElement("button");
                        button.textContent = "表を表示";

                        button.onclick = function() {
                            if (table.style.display === "none") {
                                table.style.display = "block";
                                button.textContent = "表を非表示";
                            } else {
                                table.style.display = "none";
                                button.textContent = "表を表示";
                            }
                        }

                        const baseRow = document.createElement("tr");

                        const baseCase = document.createElement("th")
                        const baseSg = document.createElement("th")
                        const basePl = document.createElement("th")

                        baseCase.textContent = "格";
                        baseRow.appendChild(baseCase);

                        baseSg.textContent = "単数";
                        baseRow.appendChild(baseSg);

                        basePl.textContent = "複数";
                        baseRow.appendChild(basePl);

                        thead.appendChild(baseRow);

                        for (const caseName of cases) {

                            const row = document.createElement("tr");

                            const caseCell = document.createElement("th");
                            caseCell.textContent = caseName;

                            const sgCell = document.createElement("td");
                            sgCell.textContent = declension[caseName].sg;
                            sgCell.classList.add("greek");

                            const plCell = document.createElement("td")
                            plCell.textContent = declension[caseName].pl;
                            plCell.classList.add("greek");

                            row.appendChild(caseCell);
                            row.appendChild(sgCell);
                            row.appendChild(plCell);
                            
                            tbody.appendChild(row);
                            
                        }

                        table.appendChild(thead);
                        table.appendChild(tbody);

                        section2.appendChild(heading4);
                        section2.appendChild(word);
                        section2.appendChild(button);
                        section2.appendChild(table);

                        
                    } 
                    
                    // 動詞処理
                    else if (data[maincategory].id === "verb") {

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

                            const section3 = document.createElement("section");
                            section3.classList.add("subconjugation-card")
                            
                            const tense = document.createElement("h5");
                            tense.textContent = subsubcategory;

                            const tenseId = heading4.id + "-" + subsubcategory;
                            tense.id = tenseId;
                            
                            const subsubsubUl = document.createElement("ul");
                            const subsubsubLi = document.createElement("li");
                            const subsubsubLink = document.createElement("a");
                            subsubsubLink.textContent = subsubcategory;
                            subsubsubLink.href = "#" + tenseId;
                            subsubsubLi.appendChild(subsubsubLink);
                            subsubsubUl.appendChild(subsubsubLi);

                            subsubLi.appendChild(subsubsubUl);

                            section3.appendChild(tense)

                            const voices = Object.keys(data[maincategory][category][subcategory][subsubcategory]);

                            for (const voice of voices) {

                                const button = document.createElement("button");
                                button.textContent = "表を表示";

                                const table = document.createElement("table")
                                table.style.display = "none";

                                const thead = document.createElement("thead");
                                const tbody = document.createElement("tbody");

                                button.onclick = function() {
                                    if (table.style.display === "none") {
                                        table.style.display = "block";
                                        button.textContent = "表を非表示";
                                    } else {
                                        table.style.display = "none";
                                        button.textContent = "表を表示";
                                    }
                                }

                                // console.log(voice)
                                const section4 = document.createElement("section");
                                section4.classList.add("subsubconjugation-card"); 

                                const heading6 = document.createElement("h6");
                                heading6.textContent = voice;

                                const conjugation = data[maincategory][category][subcategory][subsubcategory][voice];
                                const persons = Object.keys(conjugation);

                                const baseRow = document.createElement("tr");

                                const basePerson = document.createElement("th")
                                const baseSg = document.createElement("th")
                                const basePl = document.createElement("th")

                                basePerson.textContent = "人称";
                                baseRow.appendChild(basePerson);

                                baseSg.textContent = "単数";
                                baseRow.appendChild(baseSg);

                                basePl.textContent = "複数";
                                baseRow.appendChild(basePl);

                                thead.appendChild(baseRow);

                                for (const person of persons) {

                                    const row = document.createElement("tr");

                                    const personCell = document.createElement("th");
                                    personCell.textContent = person === "inf" ? "不定詞" : person;

                                    row.appendChild(personCell);

                                    if (person !== "inf") {
                                        const sgCell = document.createElement("td");
                                        sgCell.textContent = conjugation[person].sg;
                                        sgCell.classList.add("greek");

                                        const plCell = document.createElement("td")
                                        plCell.textContent = conjugation[person].pl;
                                        plCell.classList.add("greek");

                                        row.appendChild(sgCell);
                                        row.appendChild(plCell);
                                    }
                                    else {
                                        const infCell = document.createElement("td");
                                        infCell.textContent = conjugation[person];
                                        infCell.classList.add("greek", "infinitive");
                                        infCell.colSpan = 2;

                                        row.appendChild(infCell);
                                    };
                                    
                                    tbody.appendChild(row);
                                }

                                table.appendChild(thead);
                                table.appendChild(tbody);

                                section4.appendChild(heading6)
                                section4.appendChild(button);

                                section4.appendChild(table);
                                
                                console.log(section4)

                                section3.appendChild(section4)
                                
                            }    
                            section2.appendChild(section3) 
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