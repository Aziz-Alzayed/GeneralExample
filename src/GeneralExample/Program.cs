using GeneralExampleSvc.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using GeneralExampleSvc.Data.Models;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using GeneralExampleSvc.Data.Extensions;
using GeneralExampleSvc.Services;

var app = CreateWebApplicationBuilder().Build();



if (app.Environment.IsDevelopment())
{
    app.UseDatabaseMigration();
    app.UseDeveloperExceptionPage();
  
}
else// Configure the HTTP request pipeline.
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
// Use Authentication
app.UseAuthentication();
app.UseAuthorization();

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
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    builder.Services.AddDbContext<DbContextExample>(options =>
               options.UseSqlServer(connectionString));
    builder.Services.AddIdentity<User, IdentityRole>(options =>
    {
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
    })
    .AddEntityFrameworkStores<DbContextExample>()
    .AddDefaultTokenProviders();

    // Add JWT Authentication
    JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

    builder.Services.AddAuthentication(options =>
               {
                   options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                   options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                   options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
               })
               .AddJwtBearer(cfg =>
               {
                   cfg.RequireHttpsMetadata = false;
                   cfg.SaveToken = true;
                   cfg.TokenValidationParameters = new TokenValidationParameters
                   {
                       ValidIssuer = builder.Configuration["JwtIssuer"],
                       ValidAudience = builder.Configuration["JwtIssuer"],
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtKey"])),
                       ClockSkew = TimeSpan.Zero // remove delay of token when expire
                   };
               });
    // AutoMapper
    builder.Services.AddAutoMapper(typeof(Program));

    // Make urls lowercase
    builder.Services.AddRouting(routing => routing.LowercaseUrls = true);
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
    builder.Services.AddTransient<IUserService, UserService>();

}