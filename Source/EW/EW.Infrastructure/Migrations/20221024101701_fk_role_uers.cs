using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class fk_role_uers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 10, 24, 17, 17, 0, 742, DateTimeKind.Unspecified).AddTicks(2700), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 10, 24, 17, 17, 0, 742, DateTimeKind.Unspecified).AddTicks(2718), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 10, 24, 17, 17, 0, 742, DateTimeKind.Unspecified).AddTicks(2720), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 10, 24, 17, 17, 0, 742, DateTimeKind.Unspecified).AddTicks(2721), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 10, 24, 17, 17, 0, 742, DateTimeKind.Unspecified).AddTicks(2722), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 10, 24, 17, 17, 0, 742, DateTimeKind.Unspecified).AddTicks(2722), new TimeSpan(0, 7, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 10, 24, 17, 6, 28, 180, DateTimeKind.Unspecified).AddTicks(9717), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 10, 24, 17, 6, 28, 180, DateTimeKind.Unspecified).AddTicks(9736), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 10, 24, 17, 6, 28, 180, DateTimeKind.Unspecified).AddTicks(9737), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 10, 24, 17, 6, 28, 180, DateTimeKind.Unspecified).AddTicks(9738), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 10, 24, 17, 6, 28, 180, DateTimeKind.Unspecified).AddTicks(9740), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 10, 24, 17, 6, 28, 180, DateTimeKind.Unspecified).AddTicks(9740), new TimeSpan(0, 7, 0, 0, 0)) });
        }
    }
}
