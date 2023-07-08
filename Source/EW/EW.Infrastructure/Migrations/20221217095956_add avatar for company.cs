using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class addavatarforcompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                table: "Companies",
                type: "varchar(350)",
                maxLength: 350,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 17, 16, 59, 56, 662, DateTimeKind.Unspecified).AddTicks(1552), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 17, 16, 59, 56, 662, DateTimeKind.Unspecified).AddTicks(1570), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 17, 16, 59, 56, 662, DateTimeKind.Unspecified).AddTicks(1572), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 17, 16, 59, 56, 662, DateTimeKind.Unspecified).AddTicks(1573), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 17, 16, 59, 56, 662, DateTimeKind.Unspecified).AddTicks(1574), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 17, 16, 59, 56, 662, DateTimeKind.Unspecified).AddTicks(1574), new TimeSpan(0, 7, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                table: "Companies");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 15, 15, 0, 44, 282, DateTimeKind.Unspecified).AddTicks(7240), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 15, 15, 0, 44, 282, DateTimeKind.Unspecified).AddTicks(7260), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 15, 15, 0, 44, 282, DateTimeKind.Unspecified).AddTicks(7264), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 15, 15, 0, 44, 282, DateTimeKind.Unspecified).AddTicks(7265), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 15, 15, 0, 44, 282, DateTimeKind.Unspecified).AddTicks(7266), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 15, 15, 0, 44, 282, DateTimeKind.Unspecified).AddTicks(7267), new TimeSpan(0, 7, 0, 0, 0)) });
        }
    }
}
