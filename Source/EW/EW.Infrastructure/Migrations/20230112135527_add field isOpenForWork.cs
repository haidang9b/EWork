using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class addfieldisOpenForWork : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsOpenForWork",
                table: "Profiles",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsOpenForWork",
                table: "Profiles");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 8, 15, 39, 25, 794, DateTimeKind.Unspecified).AddTicks(3273), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 8, 15, 39, 25, 794, DateTimeKind.Unspecified).AddTicks(3296), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 8, 15, 39, 25, 794, DateTimeKind.Unspecified).AddTicks(3297), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 8, 15, 39, 25, 794, DateTimeKind.Unspecified).AddTicks(3298), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2023, 1, 8, 15, 39, 25, 794, DateTimeKind.Unspecified).AddTicks(3299), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2023, 1, 8, 15, 39, 25, 794, DateTimeKind.Unspecified).AddTicks(3300), new TimeSpan(0, 7, 0, 0, 0)) });
        }
    }
}
