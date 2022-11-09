using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class init3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "Roles");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 27, 347, DateTimeKind.Unspecified).AddTicks(9479), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 27, 347, DateTimeKind.Unspecified).AddTicks(9497), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 27, 347, DateTimeKind.Unspecified).AddTicks(9498), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 27, 347, DateTimeKind.Unspecified).AddTicks(9499), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 27, 347, DateTimeKind.Unspecified).AddTicks(9500), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 27, 347, DateTimeKind.Unspecified).AddTicks(9501), new TimeSpan(0, 7, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Number",
                table: "Roles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 6, 80, DateTimeKind.Unspecified).AddTicks(7060), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 6, 80, DateTimeKind.Unspecified).AddTicks(7082), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 6, 80, DateTimeKind.Unspecified).AddTicks(7083), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 6, 80, DateTimeKind.Unspecified).AddTicks(7084), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 6, 80, DateTimeKind.Unspecified).AddTicks(7086), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 8, 16, 34, 6, 80, DateTimeKind.Unspecified).AddTicks(7086), new TimeSpan(0, 7, 0, 0, 0)) });
        }
    }
}
