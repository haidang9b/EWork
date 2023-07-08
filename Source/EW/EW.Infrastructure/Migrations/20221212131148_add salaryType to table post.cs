using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class addsalaryTypetotablepost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SalaryType",
                table: "RecruitmentPosts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 12, 20, 11, 47, 868, DateTimeKind.Unspecified).AddTicks(2552), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 12, 20, 11, 47, 868, DateTimeKind.Unspecified).AddTicks(2571), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 12, 20, 11, 47, 868, DateTimeKind.Unspecified).AddTicks(2572), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 12, 20, 11, 47, 868, DateTimeKind.Unspecified).AddTicks(2573), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 12, 20, 11, 47, 868, DateTimeKind.Unspecified).AddTicks(2575), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 12, 20, 11, 47, 868, DateTimeKind.Unspecified).AddTicks(2576), new TimeSpan(0, 7, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SalaryType",
                table: "RecruitmentPosts");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 9, 16, 28, 45, 54, DateTimeKind.Unspecified).AddTicks(8395), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 9, 16, 28, 45, 54, DateTimeKind.Unspecified).AddTicks(8417), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 9, 16, 28, 45, 54, DateTimeKind.Unspecified).AddTicks(8419), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 9, 16, 28, 45, 54, DateTimeKind.Unspecified).AddTicks(8419), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 9, 16, 28, 45, 54, DateTimeKind.Unspecified).AddTicks(8421), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 9, 16, 28, 45, 54, DateTimeKind.Unspecified).AddTicks(8421), new TimeSpan(0, 7, 0, 0, 0)) });
        }
    }
}
