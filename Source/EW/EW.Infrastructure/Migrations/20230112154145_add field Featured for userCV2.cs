using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class addfieldFeaturedforuserCV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Featured",
                table: "UserCvs",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 12, 22, 41, 44, 716, DateTimeKind.Unspecified).AddTicks(218), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 12, 22, 41, 44, 716, DateTimeKind.Unspecified).AddTicks(240), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 12, 22, 41, 44, 716, DateTimeKind.Unspecified).AddTicks(244), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 12, 22, 41, 44, 716, DateTimeKind.Unspecified).AddTicks(245), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 12, 22, 41, 44, 716, DateTimeKind.Unspecified).AddTicks(247), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 12, 22, 41, 44, 716, DateTimeKind.Unspecified).AddTicks(248), new TimeSpan(0, 7, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Featured",
                table: "UserCvs");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 12, 22, 40, 50, 304, DateTimeKind.Unspecified).AddTicks(9366), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 12, 22, 40, 50, 304, DateTimeKind.Unspecified).AddTicks(9384), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 12, 22, 40, 50, 304, DateTimeKind.Unspecified).AddTicks(9385), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 12, 22, 40, 50, 304, DateTimeKind.Unspecified).AddTicks(9386), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 12, 22, 40, 50, 304, DateTimeKind.Unspecified).AddTicks(9388), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 12, 22, 40, 50, 304, DateTimeKind.Unspecified).AddTicks(9388), new TimeSpan(0, 7, 0, 0, 0)) });
        }
    }
}
