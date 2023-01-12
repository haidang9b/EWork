using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class addfieldFeaturedforuserCV : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 12, 20, 55, 26, 877, DateTimeKind.Unspecified).AddTicks(2038), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 12, 20, 55, 26, 877, DateTimeKind.Unspecified).AddTicks(2061), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 12, 20, 55, 26, 877, DateTimeKind.Unspecified).AddTicks(2064), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 12, 20, 55, 26, 877, DateTimeKind.Unspecified).AddTicks(2065), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 12, 20, 55, 26, 877, DateTimeKind.Unspecified).AddTicks(2067), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 12, 20, 55, 26, 877, DateTimeKind.Unspecified).AddTicks(2068), new TimeSpan(0, 7, 0, 0, 0)) });
        }
    }
}
