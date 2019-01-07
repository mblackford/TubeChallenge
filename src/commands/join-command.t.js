const { joinCommand } = require("./join-command");

test("the join command response", async () => {
  expect(await joinCommand("447375331944", "Matthew")).toMatchInlineSnapshot(
    `"Hi Matthew, you have registered for the Tube Challenge with your number +447375331944."`
  );
});
