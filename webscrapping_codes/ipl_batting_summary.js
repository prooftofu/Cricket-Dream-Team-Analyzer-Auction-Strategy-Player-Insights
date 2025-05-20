//Stage 1: Getting Links of each match

//INTERACTION CODE
navigate('https://www.espncricinfo.com/records/tournament/team-match-results/indian-premier-league-2024-15940');


let links = parse().matchSummaryLinks;
for(let i of links) { 
  next_stage({url: i}) 
}

//PARSER CODE
let links = []
const allRows = $('table.ds-w-full.ds-table.ds-table-xs.ds-table-auto.ds-w-full.ds-overflow-scroll.ds-scrollbar-hide > tbody > tr');
 allRows.each((index, element) => {
  const tds = $(element).find('td');
  const rowURL = "https://www.espncricinfo.com" +$(tds[6]).find('a').attr('href');
  links.push(rowURL);
 })
return {
  'matchSummaryLinks': links
};


//Stage 2: Storing Data

//INTERACTION CODE
navigate(input.url);
collect(parse());

//PARSER CODE
let teams = [];

$("span.ds-text-tight-xs").each(function () {
    let text = $(this).text();
    if (text.includes("Innings")) {
        teams.push(text.replace(" Innings", ""));
    }
});

let team1 = teams[0];
let team2 = teams[1];
let matchInfo = team1 + " Vs " + team2;

var tables = $('div > table.ci-scorecard-table');
var firstInningRows = $(tables.eq(0)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 8
})

var secondInningsRows = $(tables.eq(1)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 8
});


var battingSummary = []
firstInningRows.each((index, element) => {
  var tds = $(element).find('td');
  battingSummary.push({
  		"match": matchInfo,
  		"teamInnings": team1,
   		"battingPos": index+1,
  		"batsmanName": $(tds.eq(0)).find('a > span > span').text().replace(' ', ''),
    	"dismissal": $(tds.eq(1)).find('span > span').text(),
  		"runs": $(tds.eq(2)).find('strong').text(), 
  		"balls": $(tds.eq(3)).text(),
  		"4s": $(tds.eq(5)).text(),
  		"6s": $(tds.eq(6)).text(),
 		"SR": $(tds.eq(7)).text()
  });
});

secondInningsRows.each((index, element) => {
  var tds = $(element).find('td');
   battingSummary.push({
  		"match": matchInfo,
  		"teamInnings": team2,
   		"battingPos": index+1,
  		"batsmanName": $(tds.eq(0)).find('a > span > span').text().replace(' ', ''),
     	"dismissal": $(tds.eq(1)).find('span > span').text(),
  		"runs": $(tds.eq(2)).find('strong').text(), 
  		"balls": $(tds.eq(3)).text(),
  		"4s": $(tds.eq(5)).text(),
  		"6s": $(tds.eq(6)).text(),
 		"SR": $(tds.eq(7)).text()
  });
});

return {"battingSummary": battingSummary}