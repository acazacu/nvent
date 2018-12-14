import http from "src/store/http";
import defaultState from "src/store/modules/contact.json";
import { mutations, actions } from "src/store/modules/contact";
import flushPromises from "flush-promises";

jest.mock("src/store/http", () => {
  return {
    post: jest.fn()
  };
});

process.env.VUE_APP_BASE_URL_API = "testurl";

describe("contact store module", () => {
  let state;

  beforeEach(() => {
    jest.clearAllMocks();

    state = { ...defaultState };
  });

  describe("mutations", () => {
    it("should updateMessage", function() {
      const update = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        message: "Hello nvent"
      };

      mutations.updateMessage(state, update);

      expect(state.message).toStrictEqual(update);
    });
  });

  describe("actions", () => {
    describe("sendMessage", () => {
      it("should call http post", async () => {
        const dispatch = jest.fn();
        const url = `${process.env.VUE_APP_BASE_URL_API}/contact`;

        actions.sendMessage({
          dispatch,
          state
        });

        await flushPromises();

        expect(http.post).toHaveBeenCalledWith(url, state.message);
      });

      it("should call the clearMessage action on post success", async () => {
        const dispatch = jest.fn();

        http.post.mockResolvedValue();

        actions.sendMessage({
          dispatch,
          state
        });

        await flushPromises();

        expect(dispatch).toHaveBeenCalledWith("clearMessage");
      });

      it("should throw an error on post failure", () => {
        const error = new Error();
        const args = {
          dispatch: jest.fn(),
          state
        };

        http.post.mockRejectedValue(error);

        expect(actions.sendMessage(args)).rejects.toEqual(error);
      });
    });

    describe("clearMessage", () => {
      it("should reset the state message to its default state", () => {
        const commit = jest.fn();

        actions.clearMessage({
          commit
        });

        expect(commit).toHaveBeenCalledWith("updateMessage", defaultState.message);
      });
    });
  });
});
