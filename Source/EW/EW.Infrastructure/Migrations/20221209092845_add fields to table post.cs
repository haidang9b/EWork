using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class addfieldstotablepost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Salary",
                table: "RecruitmentPosts",
                newName: "SalaryTo");

            migrationBuilder.AddColumn<int>(
                name: "Currency",
                table: "RecruitmentPosts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SalaryFrom",
                table: "RecruitmentPosts",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Currency",
                table: "RecruitmentPosts");

            migrationBuilder.DropColumn(
                name: "SalaryFrom",
                table: "RecruitmentPosts");

            migrationBuilder.RenameColumn(
                name: "SalaryTo",
                table: "RecruitmentPosts",
                newName: "Salary");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 5, 18, 54, 24, 594, DateTimeKind.Unspecified).AddTicks(4309), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 5, 18, 54, 24, 594, DateTimeKind.Unspecified).AddTicks(4331), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 5, 18, 54, 24, 594, DateTimeKind.Unspecified).AddTicks(4333), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 5, 18, 54, 24, 594, DateTimeKind.Unspecified).AddTicks(4333), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 5, 18, 54, 24, 594, DateTimeKind.Unspecified).AddTicks(4335), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 5, 18, 54, 24, 594, DateTimeKind.Unspecified).AddTicks(4335), new TimeSpan(0, 7, 0, 0, 0)) });
        }
    }
}
