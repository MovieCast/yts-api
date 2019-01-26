import { expect } from "chai";
import "mocha";

import { YtsApi } from "./YtsApi";

describe("YtsAPI", () => {
  let ytsApi: YtsApi;

  before(() => {
    ytsApi = new YtsApi();
  });

  it("should get multiple movies", async () => {
    const res = await ytsApi.getMovieList();
    expect(res).to.be.an("object");
    testStatusAttrib(res);

    const { data } = res;
    expect(data).to.be.an("object");
    expect(data.movie_count).to.be.a("number");
    expect(data.movie_count).to.be.at.least(1);
    expect(data.limit).to.be.a("number");
    expect(data.limit).to.equal(20);
    expect(data.page_number).to.be.a("number");
    expect(data.page_number).to.be.at.least(1);
    expect(data.movies).to.be.an("array");
    expect(data.movies.length).to.be.at.least(1);

    const random = Math.floor(Math.random() * data.movies.length);
    expect(data.movies[random]).to.be.an("object");

    testMetaAttrib(res["@meta"]);
  });

  it("should throw an error while getting movies", () => {
    expect(ytsApi.getMovieList.bind(ytsApi, {
      limit: -1,
    })).to.throw("-1 is not a valid value for limit, expected a number in the range of 1 - 50!");
    expect(ytsApi.getMovieList.bind(ytsApi, {
      limit: 51,
    })).to.throw("51 is not a valid value for limit, expected a number in the range of 1 - 50!");
    expect(ytsApi.getMovieList.bind(ytsApi, {
      minimumRating: -1,
    })).to.throw("-1 is not a valid value for minimumRating, expected a number in the range of 0 - 9!");
    expect(ytsApi.getMovieList.bind(ytsApi, {
      minimumRating: 10,
    })).to.throw("10 is not a valid value for minimumRating, expected a number in the range of 0 - 9!");
    expect(ytsApi.getMovieList.bind(ytsApi, {
      withRtRatings: "notaboolean",
    })).to.throw("notaboolean is not a valid value for withRtRatings, expected an boolean!");
  });

  it("should get a movie with images and the cast", async () => {
    const res = await ytsApi.getMovieDetails(15, {
      withImages: true,
      withCast: true,
    });
    expect(res).to.be.an("object");
    testStatusAttrib(res);

    const { data } = res;
    expect(data).to.be.an("object");
    expect(data.movie).to.be.an("object");

    const meta = res["@meta"];
    testMetaAttrib(meta);
  });

  it("should throw an error while getting a movie", () => {
    expect(ytsApi.getMovieDetails.bind(ytsApi, "notanumber"))
      .to.throw("notanumber is not a valid value for id, expected an number!");
    expect(ytsApi.getMovieDetails.bind(ytsApi, 15, {
      withImages: "notanboolean",
    })).to.throw("notanboolean is not a valid value for withImages, expected an boolean!");
    expect(ytsApi.getMovieDetails.bind(ytsApi, 15, {
      withImages: true,
      withCast: "notanboolean",
    })).to.throw("notanboolean is not a valid value for withCast, expected an boolean!");
  });

  function testStatusAttrib(res) {
    expect(res.status).to.be.a("string");
    expect(res.status).to.equal("ok");
    expect(res.status_message).to.be.a("string");
    expect(res.status_message).to.equal("Query was successful");
  }

  function testMetaAttrib(meta) {
    expect(meta.server_time).to.be.a("number");
    expect(meta.server_timezone).to.be.a("string");
    expect(meta.api_version).to.be.a("number");
    expect(meta.api_version).to.equal(2);
    expect(meta.execution_time).to.be.a("string");
  }
});
