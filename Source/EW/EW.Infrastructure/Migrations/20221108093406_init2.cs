using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class init2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "Roles");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(8978), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(8996), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(8997), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(8998), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(8999), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 11, 8, 16, 33, 10, 907, DateTimeKind.Unspecified).AddTicks(9000), new TimeSpan(0, 7, 0, 0, 0)) });
        }
    }
}
