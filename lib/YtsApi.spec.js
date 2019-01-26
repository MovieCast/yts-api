"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const YtsApi_1 = require("./YtsApi");
describe("YtsAPI", () => {
    let ytsApi;
    before(() => {
        ytsApi = new YtsApi_1.YtsApi();
    });
    it("should get multiple movies", async () => {
        const res = await ytsApi.getMovieList();
        chai_1.expect(res).to.be.an("object");
        testStatusAttrib(res);
        const { data } = res;
        chai_1.expect(data).to.be.an("object");
        chai_1.expect(data.movie_count).to.be.a("number");
        chai_1.expect(data.movie_count).to.be.at.least(1);
        chai_1.expect(data.limit).to.be.a("number");
        chai_1.expect(data.limit).to.equal(20);
        chai_1.expect(data.page_number).to.be.a("number");
        chai_1.expect(data.page_number).to.be.at.least(1);
        chai_1.expect(data.movies).to.be.an("array");
        chai_1.expect(data.movies.length).to.be.at.least(1);
        const random = Math.floor(Math.random() * data.movies.length);
        chai_1.expect(data.movies[random]).to.be.an("object");
        testMetaAttrib(res["@meta"]);
    });
    it("should throw an error while getting movies", () => {
        chai_1.expect(ytsApi.getMovieList.bind(ytsApi, {
            limit: -1,
        })).to.throw("-1 is not a valid value for limit, expected a number in the range of 1 - 50!");
        chai_1.expect(ytsApi.getMovieList.bind(ytsApi, {
            limit: 51,
        })).to.throw("51 is not a valid value for limit, expected a number in the range of 1 - 50!");
        chai_1.expect(ytsApi.getMovieList.bind(ytsApi, {
            minimumRating: -1,
        })).to.throw("-1 is not a valid value for minimumRating, expected a number in the range of 0 - 9!");
        chai_1.expect(ytsApi.getMovieList.bind(ytsApi, {
            minimumRating: 10,
        })).to.throw("10 is not a valid value for minimumRating, expected a number in the range of 0 - 9!");
        chai_1.expect(ytsApi.getMovieList.bind(ytsApi, {
            withRtRatings: "notaboolean",
        })).to.throw("notaboolean is not a valid value for withRtRatings, expected an boolean!");
    });
    it("should get a movie with images and the cast", async () => {
        const res = await ytsApi.getMovieDetails(15, {
            withImages: true,
            withCast: true,
        });
        chai_1.expect(res).to.be.an("object");
        testStatusAttrib(res);
        const { data } = res;
        chai_1.expect(data).to.be.an("object");
        chai_1.expect(data.movie).to.be.an("object");
        const meta = res["@meta"];
        testMetaAttrib(meta);
    });
    it("should throw an error while getting a movie", () => {
        chai_1.expect(ytsApi.getMovieDetails.bind(ytsApi, "notanumber"))
            .to.throw("notanumber is not a valid value for id, expected an number!");
        chai_1.expect(ytsApi.getMovieDetails.bind(ytsApi, 15, {
            withImages: "notanboolean",
        })).to.throw("notanboolean is not a valid value for withImages, expected an boolean!");
        chai_1.expect(ytsApi.getMovieDetails.bind(ytsApi, 15, {
            withImages: true,
            withCast: "notanboolean",
        })).to.throw("notanboolean is not a valid value for withCast, expected an boolean!");
    });
    function testStatusAttrib(res) {
        chai_1.expect(res.status).to.be.a("string");
        chai_1.expect(res.status).to.equal("ok");
        chai_1.expect(res.status_message).to.be.a("string");
        chai_1.expect(res.status_message).to.equal("Query was successful");
    }
    function testMetaAttrib(meta) {
        chai_1.expect(meta.server_time).to.be.a("number");
        chai_1.expect(meta.server_timezone).to.be.a("string");
        chai_1.expect(meta.api_version).to.be.a("number");
        chai_1.expect(meta.api_version).to.equal(2);
        chai_1.expect(meta.execution_time).to.be.a("string");
    }
});
//# sourceMappingURL=YtsApi.spec.js.map