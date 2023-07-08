using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    public partial class addfkstotablepost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecruitmentPosts_Users_UpdatedByUserId",
                table: "RecruitmentPosts");

            migrationBuilder.DropIndex(
                name: "IX_RecruitmentPosts_UpdatedByUserId",
                table: "RecruitmentPosts");

            migrationBuilder.DropColumn(
                name: "UpdatedByUserId",
                table: "RecruitmentPosts");

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 12, 23, 34, 23, 833, DateTimeKind.Unspecified).AddTicks(4727), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 12, 23, 34, 23, 833, DateTimeKind.Unspecified).AddTicks(4749), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 12, 23, 34, 23, 833, DateTimeKind.Unspecified).AddTicks(4753), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 12, 23, 34, 23, 833, DateTimeKind.Unspecified).AddTicks(4754), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 12, 23, 34, 23, 833, DateTimeKind.Unspecified).AddTicks(4756), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 12, 23, 34, 23, 833, DateTimeKind.Unspecified).AddTicks(4757), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_RecruitmentPosts_UpdatedBy",
                table: "RecruitmentPosts",
                column: "UpdatedBy");

            migrationBuilder.AddForeignKey(
                name: "FK_RecruitmentPosts_Users_UpdatedBy",
                table: "RecruitmentPosts",
                column: "UpdatedBy",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RecruitmentPosts_Users_UpdatedBy",
                table: "RecruitmentPosts");

            migrationBuilder.DropIndex(
                name: "IX_RecruitmentPosts_UpdatedBy",
                table: "RecruitmentPosts");

            migrationBuilder.AddColumn<long>(
                name: "UpdatedByUserId",
                table: "RecruitmentPosts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7738), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7763), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 2L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7764), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7765), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 3L,
                columns: new[] { "CreatedDate", "UpdatedDate" },
                values: new object[] { new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7766), new TimeSpan(0, 7, 0, 0, 0)), new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7767), new TimeSpan(0, 7, 0, 0, 0)) });

            migrationBuilder.CreateIndex(
                name: "IX_RecruitmentPosts_UpdatedByUserId",
                table: "RecruitmentPosts",
                column: "UpdatedByUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_RecruitmentPosts_Users_UpdatedByUserId",
                table: "RecruitmentPosts",
                column: "UpdatedByUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
