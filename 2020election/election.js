/// <reference path="../shared.js" />
/// <reference path="../log.js" />

// if (!UseDebug) {
Vue.config.devtools = false;
Vue.config.debug = false;
Vue.config.silent = true;
// }

Vue.config.ignoredElements = ['controls', 'control', 'app'];

function ElectionDataObject(spec) {
  this.year = spec.year;
  this.state = spec.state.toLowerCase();
  this.state_po = spec.state_po;
  this.county_name = spec.county_name.toLowerCase();
  this.county_fips = spec.county_fips;
  this.office = spec.office;
  this.candidate = spec.candidate;
  this.party = spec.party;
  this.candidatevo = spec.candidatevo;
  this.totalvotes = spec.totalvotes;
  this.version = spec.version;
  this.mode = spec.mode;
  this.percentofvo = Math.round(1000 * (spec.candidatevo / spec.totalvotes)) / 10;
  this.winner = false;
  this.loser = false;
  this.firstCandidateListed = true;
  this.id = spec.id;
  this.expanded = spec.expanded == undefined ? false : spec.expanded;
}

var app = new Vue({
  el: '#app',
  data: {
    censusData: [],
    electionResults: [],
    electionCount: 0,
    countedVotes: 0,
    totalElectionCountForBiden: 0,
    totalElectionCountForTrump: 0,
    lowerLimit: 200000,
    upperLimit: 5000000,
    expandAll: false,
    loaded: false,
    currentCounty: null,
    currentYoffset: 0,
    r: document.querySelector(':root'),
    c: window.getComputedStyle(document.querySelector(':root')),
  },
  methods: {
    //#region EVENTS
    async OnWindowLoad() {},

    async GetCensusData() {
      await axios.get('countypres_2000-2020.csv').then((response) => {
        this.censusData = response.data.replaceAll('"', '').replaceAll('\r\n', ',').split(',');
      });

      this.FilterByLowerAndUpperLimits();
    },

    SetCurrentCounty(event) {
      this.currentCounty = event.target;
      let county = this.currentCounty.getAttribute('context');
      county.expanded = !county.expanded;
      this.currentYoffset = event.clientY;
    },

    ToggleCounties(event) {
      this.expandAll = !this.expandAll;
      if (this.currentCounty != null)
        window.setTimeout(function () {
          window.scrollTo({
            top: app.currentCounty.offsetTop - app.currentYoffset,
            left: 0,
          });
          app.currentCounty = null;
          app.currentYoffset = 0;
        }, 0);
    },

    FilterByLowerAndUpperLimits() {
      this.loaded = false;
      this.lowerLimit = Number(this.lowerLimit);
      this.upperLimit = Number(this.upperLimit);
      this.electionResults = [];
      this.electionCount = 0;
      this.countedVotes = 0;
      this.totalElectionCountForBiden = 0;
      this.totalElectionCountForTrump = 0;
      let count = 1;
      let previousRow = null;
      for (let x = 1; x < this.censusData.length / 8 - 8; x++) {
        let currentRow = x * 8;
        let newData = new ElectionDataObject({
          year: this.censusData[currentRow],
          state: this.censusData[currentRow + 1],
          county_name: this.censusData[currentRow + 2],
          county_fips: this.censusData[currentRow + 3],
          candidate: this.censusData[currentRow + 4],
          party: this.censusData[currentRow + 5],
          candidatevo: this.censusData[currentRow + 6],
          totalvotes: this.censusData[currentRow + 7],
        });
        if (newData.candidate.toUpperCase() != 'OTHER' && newData.candidate.toUpperCase() != 'JO JORGENSEN' && newData.year == 2020 && newData.totalvotes > this.lowerLimit && newData.totalvotes <= this.upperLimit) {
          if (previousRow != null && previousRow.candidate != newData.candidate && previousRow.state == newData.state && previousRow.county_name == newData.county_name) {
            Number(newData.candidatevo) > Number(previousRow.candidatevo) ? ((newData.winner = true), (previousRow.loser = true)) : (previousRow.winner = true), (newData.loser = true);
            if (newData.winner) {
              newData.loser = false;
            }
            newData.firstCandidateListed = false;
          }

          if (Number(newData.candidatevo) / Number(newData.totalvotes) > 0.5) {
            newData.winner = true;
          }

          if (newData.firstCandidateListed) {
            newData.id = 'county' + count++;
          }

          if (newData.candidate.toUpperCase() == 'JOSEPH R BIDEN JR') {
            this.totalElectionCountForBiden += Number(newData.candidatevo);
          }
          if (newData.candidate.toUpperCase() == 'DONALD J TRUMP') {
            this.totalElectionCountForTrump += Number(newData.candidatevo);
          }

          if (isNaN(parseFloat(newData.candidatevo)) == false) {
            this.countedVotes += Number(newData.candidatevo);
          } else {
          }
          if (previousRow != null && newData.candidate === previousRow.candidate && newData.county_fips === previousRow.county_fips) {
            previousRow.candidatevo = Number(previousRow.candidatevo) + Number(newData.candidatevo);
          } else {
            previousRow = newData;
            this.electionResults.push(previousRow);
          }
        }
        if (isNaN(parseFloat(newData.candidatevo)) == false && newData.year == 2020) {
          this.electionCount += Number(newData.candidatevo);
        }
      }
      for (let x = 0; x < this.electionResults.length; x++) {
        const result = this.electionResults[x];
        result.candidate = result.candidate.replaceAll('JOSEPH R BIDEN JR', 'Biden').replaceAll('DONALD J TRUMP', 'Trump');
      }
      this.loaded = true;
    },
  },
  mounted() {
    this.GetCensusData();
  },
  computed: {
    electionResultsByState: function () {
      function compare(a, b) {
        if (a.state < b.state) return -1;
        if (a.state > b.state) return 1;
        return 0;
      }

      return this.electionResults.sort(compare);
    },
    electionResultsByCandidate: function () {
      function compare(a, b) {
        if (a.candidate < b.candidate) return -1;
        if (a.candidate > b.candidate) return 1;
        return 0;
      }

      return this.electionResults.sort(compare);
    },
    electionResultsByTotalVotes: function () {
      var count = 0;
      function compare(a, b) {
        if (Number(a.totalvotes) > Number(b.totalvotes)) return -1;
        if (Number(a.totalvotes) < Number(b.totalvotes)) return 1;
        return 0;
      }
      // for (let x = 0; x < this.electionResults.length; x++) {
      //   const county = this.electionResults[x];
      //   county.firstCandidateListed ? county.id = 'county' + count++;
      // }
      return this.electionResults.sort(compare);
    },
  },
});
