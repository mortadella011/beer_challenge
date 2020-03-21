export class DatasetModel {
  cases: number;
  casesGrowth: number;
  deaths: number;
  deathsGrowth: number;
  serious: number;
  seriousGrowth: number;
  critical: number;
  criticalGrowth: number;
  recovered: number;
  recoveredGrowth: number;
  source: string;

  constructor(cases: number, casesGrowth: number, deaths: number, deathsGrowth: number, serious: number, seriousGrowth: number, critical: number, criticalGrowth: number, recovered: number, recoveredGrowth: number, source: string) {
    this.cases = cases;
    this.casesGrowth = casesGrowth;
    this.deaths = deaths;
    this.deathsGrowth = deathsGrowth;
    this.serious = serious;
    this.seriousGrowth = seriousGrowth;
    this.critical = critical;
    this.criticalGrowth = criticalGrowth;
    this.recovered = recovered;
    this.recoveredGrowth = recoveredGrowth;
    this.source = source;
  }
}

export class VirusTrackerData {
  countrydata: VirusTrackerCountryData[];
  info: VirusTrackerInfoData;
}

export class VirusTrackerCountryData {
  total_cases: number;
  total_recovered: number;
  total_unresolved: number;
  total_deaths: number;
  total_new_cases_today: number;
  total_new_deaths_today: number;
  total_active_cases: number;
  total_serious_cases: number;
}

export class VirusTrackerInfoData {
  ourid: number;
  title: string;
  code: string;
  source: string;
}
