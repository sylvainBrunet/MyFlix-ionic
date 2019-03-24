
export class Serie{
  imdbID: string;
  title: string;
  protected poster: string;
  protected plot: string;
  protected year: string;
  protected typeMedia: string;
  protected rated: string;
  protected genre: string;
  protected director: string;
  protected actors: string;
  protected awards: string;
  protected imdbRating: string;
  protected imdbVotes: string;
  protected website: string;
  protected totalSeasons: number;
  protected runTime: string;

  constructor(serie: object){
    this.imdbID = serie['imdbID'];
    this.title = serie['Title'];
    this.poster = serie['Poster'];
    this.plot = serie['Plot'];
    this.year = serie['Year'];
    this.rated = serie['Rated'];
    this.genre = serie['Genre'];
    this.director = serie['Director'];
    this.actors = serie['Actors'];
    this.awards = serie['Awards'];
    this.imdbRating = serie['imdbRating'];
    this.imdbVotes = serie['imdbVotes'];
    this.website = serie['Website'];
    this.totalSeasons = Number(serie['totalSeasons']);
    this.runTime = serie['Runtime'];
  }
}
