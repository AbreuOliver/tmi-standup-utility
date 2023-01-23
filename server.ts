import dotenv from "dotenv";
import Express from "express";
dotenv.config();
const fetch = require("node-fetch");
const cors = require("cors");

dotenv.config();
const PORT = process.env.PORT;

const app: Express.Application = Express();
app.use(cors({ origin: `http://localhost:${PORT}` }));

app.get("/", (req: Express.Request, res: Express.Response) => {
  res.send("Hello, world");
});

app.get("/user/:id", (request, response) => {
  let user = request.params.id;
  enum Assignee {
    Gabe = "5e5e93754befbd0c96cade95",
    Darcy = "557058%3Af3cd57b7-939f-41d3-a40e-3960172ce300",
    Oliver = "61268aa7db2b4e006a1eb9a9",
    Bart = "61083895fc68c10069d2b212",
    Alex = "5c3377fd81c1261667ae036d",
    Sam = "60da60dd31361700779de1cd",
    Tyler = "6189376e5fe6c70069ba8a88",
    Saurabh = "6074ace76576f400681998d0",
  }
  let selectedUser = Assignee[user as keyof typeof Assignee];
  fetch(
    `https://extron.atlassian.net/rest/api/3/search?jql=assignee=${selectedUser}+AND+project=GVIL+AND+(status="In+Progress"+OR+status="UX+Verify"+OR+status="Code+Review"+OR+status="Under+Verification"+OR+status="PO+Verify")`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.USERNAME + "@" + process.env.DOMAIN}:${
            process.env.PASSWORD
          }`
        ).toString("base64")}`,
        Accept: "application/json",
      },
    }
  )
    .then(
      (response: { status: number; statusText: string; json: () => any }) => {
        return response.json();
      }
    )
    .then((obj: any) => {
      response.send({
        "Total Issues:": obj.total,
      });
    })
    .then((text: any) =>
      console.log("Username", process.env.USERNAME + "@" + process.env.DOMAIN)
    )
    .then((text: any) => console.log("Password", process.env.PASSWORD))
    .catch((err: any) => console.error("ERROR", err));
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});

app.get("/user/:id/issues", (request, response) => {
  let user = request.params.id;
  enum Assignee {
    Gabe = "5e5e93754befbd0c96cade95",
    Darcy = "557058%3Af3cd57b7-939f-41d3-a40e-3960172ce300",
    Oliver = "61268aa7db2b4e006a1eb9a9",
    Bart = "61083895fc68c10069d2b212",
    Alex = "5c3377fd81c1261667ae036d",
    Sam = "60da60dd31361700779de1cd",
    Tyler = "6189376e5fe6c70069ba8a88",
    Saurabh = "6074ace76576f400681998d0",
  }
  let selectedUser = Assignee[user as keyof typeof Assignee];
  fetch(
    `https://extron.atlassian.net/rest/api/3/search?jql=assignee=${selectedUser}+AND+project=GVIL+AND+(status="In+Progress"+OR+status="UX+Verify"+OR+status="Code+Review"+OR+status="Under+Verification"+OR+status="PO+Verify")`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.USERNAME + "@" + process.env.DOMAIN}:${
            process.env.PASSWORD
          }`
        ).toString("base64")}`,
        Accept: "application/json",
      },
    }
  )
    .then(
      (response: { status: number; statusText: string; json: () => any }) => {
        return response.json();
      }
    )
    .then((obj: any) => {
      let pendingResponse = [];
      for (let index = 0; index < obj.total; index++) {
        pendingResponse.push({
          Issue: obj.issues[index].key,
          Status: obj.issues[index].fields.status.name,
          "Issue Title": obj.issues[index].fields.summary,
          "Issue Type": obj.issues[index].fields.issuetype.name,
          Team: obj.issues[index].fields.customfield_12601.value,
          Epic: obj.issues[index].fields.parent.fields.summary,
          Link: `https://extron.atlassian.net/browse/${obj.issues[index].key}`,
          Priority: obj.issues[index].fields.parent.fields.priority.name,
          "Last Viewed": obj.issues[index].fields.lastViewed,
          "Story Points": obj.issues[index].fields.customfield_10002,
        });
      }
      response.send(pendingResponse);
    })
    .catch((err: any) => console.error("ERROR", err));
});

app.get("/user/:id/issues/blob", (request, response) => {
  let user = request.params.id;
  enum Assignee {
    Gabe = "5e5e93754befbd0c96cade95",
    Darcy = "557058%3Af3cd57b7-939f-41d3-a40e-3960172ce300",
    Oliver = "61268aa7db2b4e006a1eb9a9",
    Bart = "61083895fc68c10069d2b212",
    Alex = "5c3377fd81c1261667ae036d",
    Sam = "60da60dd31361700779de1cd",
    Tyler = "6189376e5fe6c70069ba8a88",
    Saurabh = "6074ace76576f400681998d0",
  }
  let selectedUser = Assignee[user as keyof typeof Assignee];
  fetch(
    `https://extron.atlassian.net/rest/api/3/search?jql=assignee=${selectedUser}+AND+project=GVIL+AND+(status="In+Progress"+OR+status="UX+Verify"+OR+status="Code+Review"+OR+status="Under+Verification"+OR+status="PO+Verify")`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.USERNAME + "@" + process.env.DOMAIN}:${
            process.env.PASSWORD
          }`
        ).toString("base64")}`,
        Accept: "application/json",
      },
    }
  )
    .then(
      (response: { status: number; statusText: string; json: () => any }) => {
        return response.json();
      }
    )
    .then((obj: any) => {
      response.send(obj);
    })
    .catch((err: any) => console.error("ERROR", err));
});
