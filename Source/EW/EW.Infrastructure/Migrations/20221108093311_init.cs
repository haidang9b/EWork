using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedDate = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    UpdatedDate = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FullName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    PhoneNumber = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ImageUrl = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    RoleId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedDate = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    UpdatedDate = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Roles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "CreatedDate", "Description", "Name", "UpdatedDate" },
                values: new object[] { 1L, new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(8978), new TimeSpan(0, 7, 0, 0, 0)), "Faculty", "Faculty", new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(8996), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "CreatedDate", "Description", "Name", "UpdatedDate" },
                values: new object[] { 2L, new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(8997), new TimeSpan(0, 7, 0, 0, 0)), "Business", "Business", new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(8998), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "CreatedDate", "Description", "Name", "UpdatedDate" },
                values: new object[] { 3L, new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(8999), new TimeSpan(0, 7, 0, 0, 0)), "Student", "Student", new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(9000), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_Users_RoleId",
                table: "Users",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
