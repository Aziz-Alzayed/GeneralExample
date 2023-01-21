var app = CreateWebApplicationBuilder().Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");
app.MapFallbackToFile("index.html");

app.Run();

WebApplicationBuilder CreateWebApplicationBuilder()
{
    var builder = WebApplication.CreateBuilder(args);
    Configuration(builder);
    Logging(builder);
    Services(builder);


    return builder;
}
void Configuration(WebApplicationBuilder builder)
{

}
void Logging(WebApplicationBuilder builder)
{
    builder.Logging
        .ClearProviders()
        .AddJsonConsole(options =>
        {
            options.IncludeScopes = true;
            options.TimestampFormat = "yyyy-MM-ddTHH:mm:ssZ";
            options.UseUtcTimestamp = true;
        });
}

void Services(WebApplicationBuilder builder)
{
    builder.Services.AddControllersWithViews();

}