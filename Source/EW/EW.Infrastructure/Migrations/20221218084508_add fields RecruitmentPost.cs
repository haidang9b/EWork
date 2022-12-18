using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class addfieldsRecruitmentPost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TechStacks",
                table: "RecruitmentPosts",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "WorkingType",
                table: "RecruitmentPosts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "YearExperience",
                table: "RecruitmentPosts",
                type: "double",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 18, 15, 45, 8, 546, DateTimeKind.Unspecified).AddTicks(955), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 18, 15, 45, 8, 546, DateTimeKind.Unspecified).AddTicks(974), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 18, 15, 45, 8, 546, DateTimeKind.Unspecified).AddTicks(976), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 18, 15, 45, 8, 546, DateTimeKind.Unspecified).AddTicks(978), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 18, 15, 45, 8, 546, DateTimeKind.Unspecified).AddTicks(979), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 18, 15, 45, 8, 546, DateTimeKind.Unspecified).AddTicks(980), new TimeSpan(0, 7, 0, 0, 0)) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TechStacks",
                table: "RecruitmentPosts");

            migrationBuilder.DropColumn(
                name: "WorkingType",
                table: "RecruitmentPosts");

            migrationBuilder.DropColumn(
                name: "YearExperience",
                table: "RecruitmentPosts");

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
    }
}
