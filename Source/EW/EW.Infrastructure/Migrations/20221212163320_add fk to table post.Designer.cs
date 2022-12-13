﻿// <auto-generated />
using System;
using EW.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace EW.Infrastructure.Migrations
{
    [DbContext(typeof(EWContext))]
    [Migration("20221212163320_add fk to table post")]
    partial class addfktotablepost
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("EW.Domain.Entities.Company", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("EW.Domain.Entities.Recruiter", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<long>("CompanyId")
                        .HasColumnType("bigint");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("UserId");

                    b.ToTable("Recruiters");
                });

            modelBuilder.Entity("EW.Domain.Entities.RecruitmentPost", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<long>("CompanyId")
                        .HasColumnType("bigint");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Currency")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("Deadline")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("JobDescription")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("JobTitle")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("SalaryFrom")
                        .HasColumnType("int");

                    b.Property<int>("SalaryTo")
                        .HasColumnType("int");

                    b.Property<int>("SalaryType")
                        .HasColumnType("int");

                    b.Property<long>("UpdatedBy")
                        .HasColumnType("bigint");

                    b.Property<long>("UpdatedByUserId")
                        .HasColumnType("bigint");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("UpdatedByUserId");

                    b.ToTable("RecruitmentPosts");
                });

            modelBuilder.Entity("EW.Domain.Entities.Role", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            Id = 1L,
                            CreatedDate = new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7738), new TimeSpan(0, 7, 0, 0, 0)),
                            Description = "Faculty",
                            Name = "Faculty",
                            UpdatedDate = new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7763), new TimeSpan(0, 7, 0, 0, 0))
                        },
                        new
                        {
                            Id = 2L,
                            CreatedDate = new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7764), new TimeSpan(0, 7, 0, 0, 0)),
                            Description = "Business",
                            Name = "Business",
                            UpdatedDate = new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7765), new TimeSpan(0, 7, 0, 0, 0))
                        },
                        new
                        {
                            Id = 3L,
                            CreatedDate = new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7766), new TimeSpan(0, 7, 0, 0, 0)),
                            Description = "Student",
                            Name = "Student",
                            UpdatedDate = new DateTimeOffset(new DateTime(2022, 12, 12, 23, 33, 19, 794, DateTimeKind.Unspecified).AddTicks(7767), new TimeSpan(0, 7, 0, 0, 0))
                        });
                });

            modelBuilder.Entity("EW.Domain.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("CoverLetter")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("ImageUrl")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("RoleId")
                        .HasColumnType("bigint");

                    b.Property<string>("TokenResetPassword")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("EW.Domain.Entities.UserCV", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("CVName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("CVUrl")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserCvs");
                });

            modelBuilder.Entity("EW.Domain.Entities.UserExperience", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTimeOffset>("FromDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTimeOffset>("ToDate")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<long>("UserId")
                        .HasColumnType("bigint");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("UserExperiences");
                });

            modelBuilder.Entity("EW.Domain.Entities.Recruiter", b =>
                {
                    b.HasOne("EW.Domain.Entities.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EW.Domain.Entities.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("User");
                });

            modelBuilder.Entity("EW.Domain.Entities.RecruitmentPost", b =>
                {
                    b.HasOne("EW.Domain.Entities.Company", "Company")
                        .WithMany()
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("EW.Domain.Entities.User", "UpdatedByUser")
                        .WithMany()
                        .HasForeignKey("UpdatedByUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("UpdatedByUser");
                });

            modelBuilder.Entity("EW.Domain.Entities.User", b =>
                {
                    b.HasOne("EW.Domain.Entities.Role", "Role")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");
                });

            modelBuilder.Entity("EW.Domain.Entities.UserCV", b =>
                {
                    b.HasOne("EW.Domain.Entities.User", "User")
                        .WithMany("CVs")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EW.Domain.Entities.UserExperience", b =>
                {
                    b.HasOne("EW.Domain.Entities.User", "User")
                        .WithMany("Experences")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("EW.Domain.Entities.Role", b =>
                {
                    b.Navigation("Users");
                });

            modelBuilder.Entity("EW.Domain.Entities.User", b =>
                {
                    b.Navigation("CVs");

                    b.Navigation("Experences");
                });
#pragma warning restore 612, 618
        }
    }
}
