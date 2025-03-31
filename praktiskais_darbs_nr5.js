fetch('https://poetrydb.org/author')//autoru saraksts no API priekš combo box
    .then(resp => resp.json())
    .then(data => {
        const authorcombobox1 = document.getElementById('author1');
        const authorcombobox2 = document.getElementById('author2');

    data.authors.forEach(author => {
        const option1 = document.createElement('option');// combo box 1 saraksta autoriem
        option1.value = author;
        option1.textContent = author;
        authorcombobox1.appendChild(option1);

        const option2 = document.createElement('option');// combo box 2 saraksta autoriem
        option2.value = author;
        option2.textContent = author;
        authorcombobox2.appendChild(option2);
    });
    }).catch(error => console.error('Error fetching authors:', error));

async function authorData() {
    // Lietotāja izvēlētie autoru vārdi
    let author1 = document.getElementById('author1').value;
    let author2 = document.getElementById('author2').value;
  
    if (author1 === author2) { // lietotājs nevar izvēlēties 2 vienādus autorus.
      alert('Please select two different authors.');
      return;
    }
  
    try {
        //Autoru datu iegūšana no API
        let author1data = await fetch(`https://poetrydb.org/author/${encodeURIComponent(author1)}/title`)
        .then(resp => resp.json());
        let author2data = await fetch(`https://poetrydb.org/author/${encodeURIComponent(author2)}/title`)
        .then(resp => resp.json());
        //Autoru datu iegūšana par poēmām ar vārdu "love"
        let lovePoems1 = await fetch(`https://poetrydb.org/author,title/${encodeURIComponent(author1)};love`)
        .then(resp => resp.json());
        let lovePoems2 = await fetch(`https://poetrydb.org/author,title/${encodeURIComponent(author2)};love`)
        .then(resp => resp.json());
        //Random poēmu iegūšana
        let randomPoem1 = await fetch(`https://poetrydb.org/author,random/${encodeURIComponent(author1)};1/title,lines,linecount`)
        .then(resp => resp.json());
        let randomPoem2 = await fetch(`https://poetrydb.org/author,random/${encodeURIComponent(author2)};1/title,lines,linecount`)
        .then(resp => resp.json());
  
        // API datu analizēšana.
        let analysisDiv = document.getElementById('analysis');
        analysisDiv.innerHTML = '';

        // Salīdzinājumu dati
        let poems1 = author1data.length;
        let poems2 = author2data.length;
        var poemCountDiff = poems1 - poems2;
        let lovePoemCount1 = lovePoems1.length === undefined ? "no" : lovePoems1.length;
        let lovePoemCount2 = lovePoems2.length === undefined ? "none" : lovePoems2.length;
        // Random poēmai 1
        let poem1Title = randomPoem1[0].title;
        let poem1Lines = randomPoem1[0].lines;
        let poem1LineCount = randomPoem1[0].linecount;
        let theCount1 = countThe(poem1Lines);
        // Random poēmai 1
        let poem2Title = randomPoem2[0].title;
        let poem2Lines = randomPoem2[0].lines;
        let poem2LineCount = randomPoem2[0].linecount;
        let theCount2 = countThe(poem2Lines);

        // Salīdzinājumu rezultātu izvadei
        analysisDiv.innerHTML += `<h5><em>${author1}</em> has <strong>${poems1}</strong> poems and <em>${author2}</em> has <strong>${poems2}</strong> poems.</h5>`;
        analysisDiv.innerHTML += `<p>${author1} has <strong>${Math.abs(poemCountDiff)}</strong> ${poemCountDiff > 0 ? 'more' : 'less'} poems than ${author2}.</p>`;
        analysisDiv.innerHTML += `<p>${author1} has <strong>${lovePoemCount1}</strong> poems with 'love' in the title, and ${author2} ${lovePoemCount1 === lovePoemCount2 ? "also" : ""} has <strong>${lovePoemCount2}</strong>.</p>`;
        // Random dzejoņu satura analīze
        analysisDiv.innerHTML += `<p><strong>The word <em>"the"</em> is one of the most frequently used words in the english language.</strong></p>`;
        analysisDiv.innerHTML += `<p>Poem "${poem1Title}" by ${author1} has <em>"the"</em> mentioned <strong>${theCount1}</strong> times.</p>`;
        analysisDiv.innerHTML += `<p>Poem "${poem2Title}" by ${author2} has <em>"the"</em> mentioned <strong>${theCount2}</strong> times.</p>`;
        analysisDiv.innerHTML += `<hr>`;
        analysisDiv.innerHTML += `<h4 class="text-center my-6"><em>Random poems from the 2 authors</em></h4>`;
        analysisDiv.innerHTML += `<hr>`;

        // Random dzejoļu izvade
        analysisDiv.innerHTML += `
            <div class="col">
                <p><strong>${poem1Title}</strong> <em>by</em> ${author1} (${poem1LineCount} lines)</p>
                <p>${poem1Lines.join('<br>')}</p>
            </div>`;
        
        analysisDiv.innerHTML += `
            <div class="col">
                <p><strong>${poem2Title}</strong> <em>by</em> ${author2} (${poem2LineCount} lines)</p>
                <p>${poem2Lines.join('<br>')}</p>
            </div>`;

    } catch (error) {
        console.error('Error fetching author data:', error);
    }
}

function countThe(poemLines) {
    let the = 0;
    poemLines.forEach(line => {
        let words = line.toLowerCase().split(/\s+/);
        words.forEach(word => {
            if (word === 'the') {
                the++;
            }
        });
    });
    return the;
}