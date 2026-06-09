/**
 * File: /js/teams.js
 * Description: Master NFL teams data array — all 32 teams with accurate colors,
 *              slugs matching logo filenames, and break-state fields.
 * Usage: import or <script src> then reference NFL_TEAMS globally.
 */

/** @type {Array<{id:string,name:string,abbreviation:string,primaryColor:string,secondaryColor:string,logoPath:string,claimed:boolean,claimedBy:string|null}>} */
const NFL_TEAMS = [
  /* ── AFC EAST ──────────────────────────────────────────────── */
  {
    id: 'buf', name: 'Buffalo Bills', abbreviation: 'BUF',
    primaryColor: '#00338D', secondaryColor: '#C60C30',
    logoPath: 'assets/nfl-logos/buf.png', claimed: false, claimedBy: null
  },
  {
    id: 'mia', name: 'Miami Dolphins', abbreviation: 'MIA',
    primaryColor: '#008E97', secondaryColor: '#FC4C02',
    logoPath: 'assets/nfl-logos/mia.png', claimed: false, claimedBy: null
  },
  {
    id: 'ne',  name: 'New England Patriots', abbreviation: 'NE',
    primaryColor: '#002244', secondaryColor: '#C60C30',
    logoPath: 'assets/nfl-logos/ne.png',  claimed: false, claimedBy: null
  },
  {
    id: 'nyj', name: 'New York Jets', abbreviation: 'NYJ',
    primaryColor: '#125740', secondaryColor: '#FFFFFF',
    logoPath: 'assets/nfl-logos/nyj.png', claimed: false, claimedBy: null
  },

  /* ── AFC NORTH ──────────────────────────────────────────────── */
  {
    id: 'bal', name: 'Baltimore Ravens', abbreviation: 'BAL',
    primaryColor: '#241773', secondaryColor: '#9E7C0C',
    logoPath: 'assets/nfl-logos/bal.png', claimed: false, claimedBy: null
  },
  {
    id: 'cle', name: 'Cleveland Browns', abbreviation: 'CLE',
    primaryColor: '#311D00', secondaryColor: '#FF3C00',
    logoPath: 'assets/nfl-logos/cle.png', claimed: false, claimedBy: null
  },
  {
    id: 'cin', name: 'Cincinnati Bengals', abbreviation: 'CIN',
    primaryColor: '#FB4F14', secondaryColor: '#000000',
    logoPath: 'assets/nfl-logos/cin.png', claimed: false, claimedBy: null
  },
  {
    id: 'pit', name: 'Pittsburgh Steelers', abbreviation: 'PIT',
    primaryColor: '#FFB612', secondaryColor: '#101820',
    logoPath: 'assets/nfl-logos/pit.png', claimed: false, claimedBy: null
  },

  /* ── AFC SOUTH ──────────────────────────────────────────────── */
  {
    id: 'hou', name: 'Houston Texans', abbreviation: 'HOU',
    primaryColor: '#03202F', secondaryColor: '#A71930',
    logoPath: 'assets/nfl-logos/hou.png', claimed: false, claimedBy: null
  },
  {
    id: 'ind', name: 'Indianapolis Colts', abbreviation: 'IND',
    primaryColor: '#002C5F', secondaryColor: '#A2AAAD',
    logoPath: 'assets/nfl-logos/ind.png', claimed: false, claimedBy: null
  },
  {
    id: 'jax', name: 'Jacksonville Jaguars', abbreviation: 'JAX',
    primaryColor: '#006778', secondaryColor: '#9F792C',
    logoPath: 'assets/nfl-logos/jax.png', claimed: false, claimedBy: null
  },
  {
    id: 'ten', name: 'Tennessee Titans', abbreviation: 'TEN',
    primaryColor: '#0C2340', secondaryColor: '#4B92DB',
    logoPath: 'assets/nfl-logos/ten.png', claimed: false, claimedBy: null
  },

  /* ── AFC WEST ───────────────────────────────────────────────── */
  {
    id: 'den', name: 'Denver Broncos', abbreviation: 'DEN',
    primaryColor: '#FB4F14', secondaryColor: '#002244',
    logoPath: 'assets/nfl-logos/den.png', claimed: false, claimedBy: null
  },
  {
    id: 'kc',  name: 'Kansas City Chiefs', abbreviation: 'KC',
    primaryColor: '#E31837', secondaryColor: '#FFB81C',
    logoPath: 'assets/nfl-logos/kc.png',  claimed: false, claimedBy: null
  },
  {
    id: 'lv',  name: 'Las Vegas Raiders', abbreviation: 'LV',
    primaryColor: '#000000', secondaryColor: '#A5ACAF',
    logoPath: 'assets/nfl-logos/lv.png',  claimed: false, claimedBy: null
  },
  {
    id: 'lac', name: 'Los Angeles Chargers', abbreviation: 'LAC',
    primaryColor: '#0080C6', secondaryColor: '#FFC20E',
    logoPath: 'assets/nfl-logos/lac.png', claimed: false, claimedBy: null
  },

  /* ── NFC EAST ───────────────────────────────────────────────── */
  {
    id: 'dal', name: 'Dallas Cowboys', abbreviation: 'DAL',
    primaryColor: '#003594', secondaryColor: '#041E42',
    logoPath: 'assets/nfl-logos/dal.png', claimed: false, claimedBy: null
  },
  {
    id: 'nyg', name: 'New York Giants', abbreviation: 'NYG',
    primaryColor: '#0B2265', secondaryColor: '#A71930',
    logoPath: 'assets/nfl-logos/nyg.png', claimed: false, claimedBy: null
  },
  {
    id: 'phi', name: 'Philadelphia Eagles', abbreviation: 'PHI',
    primaryColor: '#004C54', secondaryColor: '#A5ACAF',
    logoPath: 'assets/nfl-logos/phi.png', claimed: false, claimedBy: null
  },
  {
    id: 'wsh', name: 'Washington Commanders', abbreviation: 'WSH',
    primaryColor: '#5A1414', secondaryColor: '#FFB612',
    logoPath: 'assets/nfl-logos/wsh.png', claimed: false, claimedBy: null
  },

  /* ── NFC NORTH ──────────────────────────────────────────────── */
  {
    id: 'chi', name: 'Chicago Bears', abbreviation: 'CHI',
    primaryColor: '#0B162A', secondaryColor: '#C83803',
    logoPath: 'assets/nfl-logos/chi.png', claimed: false, claimedBy: null
  },
  {
    id: 'det', name: 'Detroit Lions', abbreviation: 'DET',
    primaryColor: '#0076B6', secondaryColor: '#B0B7BC',
    logoPath: 'assets/nfl-logos/det.png', claimed: false, claimedBy: null
  },
  {
    id: 'gb',  name: 'Green Bay Packers', abbreviation: 'GB',
    primaryColor: '#203731', secondaryColor: '#FFB612',
    logoPath: 'assets/nfl-logos/gb.png',  claimed: false, claimedBy: null
  },
  {
    id: 'min', name: 'Minnesota Vikings', abbreviation: 'MIN',
    primaryColor: '#4F2683', secondaryColor: '#FFC62F',
    logoPath: 'assets/nfl-logos/min.png', claimed: false, claimedBy: null
  },

  /* ── NFC SOUTH ──────────────────────────────────────────────── */
  {
    id: 'atl', name: 'Atlanta Falcons', abbreviation: 'ATL',
    primaryColor: '#A71930', secondaryColor: '#000000',
    logoPath: 'assets/nfl-logos/atl.png', claimed: false, claimedBy: null
  },
  {
    id: 'car', name: 'Carolina Panthers', abbreviation: 'CAR',
    primaryColor: '#0085CA', secondaryColor: '#101820',
    logoPath: 'assets/nfl-logos/car.png', claimed: false, claimedBy: null
  },
  {
    id: 'no',  name: 'New Orleans Saints', abbreviation: 'NO',
    primaryColor: '#101820', secondaryColor: '#D3BC8D',
    logoPath: 'assets/nfl-logos/no.png',  claimed: false, claimedBy: null
  },
  {
    id: 'tb',  name: 'Tampa Bay Buccaneers', abbreviation: 'TB',
    primaryColor: '#D50A0A', secondaryColor: '#FF7900',
    logoPath: 'assets/nfl-logos/tb.png',  claimed: false, claimedBy: null
  },

  /* ── NFC WEST ───────────────────────────────────────────────── */
  {
    id: 'ari', name: 'Arizona Cardinals', abbreviation: 'ARI',
    primaryColor: '#97233F', secondaryColor: '#000000',
    logoPath: 'assets/nfl-logos/ari.png', claimed: false, claimedBy: null
  },
  {
    id: 'lar', name: 'Los Angeles Rams', abbreviation: 'LAR',
    primaryColor: '#003594', secondaryColor: '#FFA300',
    logoPath: 'assets/nfl-logos/lar.png', claimed: false, claimedBy: null
  },
  {
    id: 'sf',  name: 'San Francisco 49ers', abbreviation: 'SF',
    primaryColor: '#AA0000', secondaryColor: '#B3995D',
    logoPath: 'assets/nfl-logos/sf.png',  claimed: false, claimedBy: null
  },
  {
    id: 'sea', name: 'Seattle Seahawks', abbreviation: 'SEA',
    primaryColor: '#002244', secondaryColor: '#69BE28',
    logoPath: 'assets/nfl-logos/sea.png', claimed: false, claimedBy: null
  },
];

/** Returns a deep copy of the teams array with claimed state reset. */
const getDefaultTeams = () => NFL_TEAMS.map(t => ({ ...t, claimed: false, claimedBy: null }));

/** Returns a team object by id slug, or undefined. */
const getTeamById = (id) => NFL_TEAMS.find(t => t.id === id);

/* Make available both as ES module export and as global for non-module scripts */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NFL_TEAMS, getDefaultTeams, getTeamById };
}
