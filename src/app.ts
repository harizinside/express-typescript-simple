import * as express from "express";
import * as path from "path";
import routes from "./routes/index";

const app = express.default();

app.use(express.static(path.join(__dirname, "public")));
app.use("/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err: any = new Error("Not Found");
  err["status"] = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  // eslint-disable-line @typescript-eslint/no-unused-vars
  app.use((err: any, req: any, res: any, next: any) => { 
    res.status(err["status"] || 500);
    res.send({
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-line @typescript-eslint/no-unused-vars
app.use((err: any, req: any, res: any, next: any) => { 
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {},
  });
});

app.set("port", 3000);
app.listen(app.get("port"));
