//Stage 1: Getting Links of each match

//INTERACTION CODE
navigate('https://www.espncricinfo.com/records/tournament/team-match-results/indian-premier-league-2024-15940');


let links = parse().playersLinks;
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
  'playersLinks': links
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

var tables = $('div > table.ds-w-full.ds-table.ds-table-md.ds-table-auto');
var firstInningRows = $(tables.eq(1)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 11
})

var secondInningsRows = $(tables.eq(3)).find('tbody > tr').filter(function(index, element){
  return $(this).find("td").length >= 11
});


var bowlingSummary = []
firstInningRows.each((index, element) => {
  var tds = $(element).find('td');
  bowlingSummary.push({
  		"match": matchInfo,
  		"bowlingTeam": team2,
   		"bowlerName": $(tds.eq(0)).find('a > span').text().replace(' ', ''),
    	"overs": $(tds.eq(1)).text(),
  		"maiden": $(tds.eq(2)).text(), 
  		"runs": $(tds.eq(3)).text(),
  		"wickets": $(tds.eq(4)).text(),
  		"economy": $(tds.eq(5)).text(),
 		"0s": $(tds.eq(6)).text(),
    	"4s": $(tds.eq(7)).text(),
    	"6s": $(tds.eq(8)).text(),
    	"wides": $(tds.eq(9)).text(),
    	"noBalls": $(tds.eq(10)).text()
  });
});

secondInningsRows.each((index, element) => {
  var tds = $(element).find('td');
   bowlingSummary.push({
  		"match": matchInfo,
  		"bowlingTeam": team1,
   		"bowlerName": $(tds.eq(0)).find('a > span').text().replace(' ', ''),
    	"overs": $(tds.eq(1)).text(),
  		"maiden": $(tds.eq(2)).text(), 
  		"runs": $(tds.eq(3)).text(),
  		"wickets": $(tds.eq(4)).text(),
  		"economy": $(tds.eq(5)).text(),
 		"0s": $(tds.eq(6)).text(),
    	"4s": $(tds.eq(7)).text(),
    	"6s": $(tds.eq(8)).text(),
    	"wides": $(tds.eq(9)).text(),
    	"noBalls": $(tds.eq(10)).text()
  });
});

return {"bowlingSummary": bowlingSummary}