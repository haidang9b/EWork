using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class InitialStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 57, 485, DateTimeKind.Unspecified).AddTicks(9021), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 57, 485, DateTimeKind.Unspecified).AddTicks(9038), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 57, 485, DateTimeKind.Unspecified).AddTicks(9040), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 57, 485, DateTimeKind.Unspecified).AddTicks(9041), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 57, 485, DateTimeKind.Unspecified).AddTicks(9042), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 57, 485, DateTimeKind.Unspecified).AddTicks(9042), new TimeSpan(0, 7, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 41, 19, DateTimeKind.Unspecified).AddTicks(5356), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 41, 19, DateTimeKind.Unspecified).AddTicks(5377), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 41, 19, DateTimeKind.Unspecified).AddTicks(5379), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 41, 19, DateTimeKind.Unspecified).AddTicks(5379), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 41, 19, DateTimeKind.Unspecified).AddTicks(5380), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 25, 10, 31, 41, 19, DateTimeKind.Unspecified).AddTicks(5381), new TimeSpan(0, 7, 0, 0, 0)) });
        }
    }
}
