import runner, { IMeeshkanDoneCallback, IRunnerOptions } from "unmock-runner";
import unmock from "unmock";

export const jestRunner = (
  fn?: jest.ProvidesCallback,
  options?: Partial<IRunnerOptions>
) => async (cb?: jest.DoneCallback) => {
  return runner((e: Error) => e.constructor.name === "JestAssertionError")(
    unmock
  )((meeshkanCallback: IMeeshkanDoneCallback) => {
    const asJestCallback = () => {
      meeshkanCallback.success();
    };
    asJestCallback.fail = meeshkanCallback.fail;
    return fn ? fn(asJestCallback) : undefined;
  }, options)(cb ? { success: cb, fail: cb.fail } : undefined);
};

export default jestRunner;
