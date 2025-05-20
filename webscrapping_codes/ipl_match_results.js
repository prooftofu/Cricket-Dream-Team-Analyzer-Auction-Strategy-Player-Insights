//Stage 1: Getting Links of each match

//INTERACTION CODE
navigate('https://www.espncricinfo.com/records/tournament/team-match-results/indian-premier-league-2024-15940');
collect(parse());

//PARSER CODE
let matchSummary = []

const allRows = $('table.ds-w-full.ds-table.ds-table-xs.ds-table-auto.ds-w-full.ds-overflow-scroll.ds-scrollbar-hide > tbody > tr');

 allRows.each((index, element) => {
 		const tds = $(element).find('td');
		matchSummary.push({
              'team1':  $(tds[0]).text(),
              'team2':  $(tds[1]).text(),
              'winner':  $(tds[2]).text(),
              'margin':  $(tds[3]).text(),
              'ground': $(tds[4]).text(),
              'matchDate': $(tds[5]).text(),
              'scorecard':   $(tds[6]).text() 
		})   
 })

return {
  "matchSummary": matchSummary
};