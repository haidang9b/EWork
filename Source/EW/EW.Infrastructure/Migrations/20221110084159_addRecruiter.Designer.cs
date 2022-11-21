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
    [Migration("20221110084159_addRecruiter")]
    partial class addRecruiter
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("EW.Domain.Entities.Recruiter", b =>
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

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Position")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("Status")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.HasKey("Id");

                    b.ToTable("Recruiters");
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
                            CreatedDate = new DateTimeOffset(new DateTime(2022, 11, 10, 15, 41, 58, 728, DateTimeKind.Unspecified).AddTicks(6442), new TimeSpan(0, 7, 0, 0, 0)),
                            Description = "Faculty",
                            Name = "Faculty",
                            UpdatedDate = new DateTimeOffset(new DateTime(2022, 11, 10, 15, 41, 58, 728, DateTimeKind.Unspecified).AddTicks(6463), new TimeSpan(0, 7, 0, 0, 0))
                        },
                        new
                        {
                            Id = 2L,
                            CreatedDate = new DateTimeOffset(new DateTime(2022, 11, 10, 15, 41, 58, 728, DateTimeKind.Unspecified).AddTicks(6464), new TimeSpan(0, 7, 0, 0, 0)),
                            Description = "Business",
                            Name = "Business",
                            UpdatedDate = new DateTimeOffset(new DateTime(2022, 11, 10, 15, 41, 58, 728, DateTimeKind.Unspecified).AddTicks(6465), new TimeSpan(0, 7, 0, 0, 0))
                        },
                        new
                        {
                            Id = 3L,
                            CreatedDate = new DateTimeOffset(new DateTime(2022, 11, 10, 15, 41, 58, 728, DateTimeKind.Unspecified).AddTicks(6466), new TimeSpan(0, 7, 0, 0, 0)),
                            Description = "Student",
                            Name = "Student",
                            UpdatedDate = new DateTimeOffset(new DateTime(2022, 11, 10, 15, 41, 58, 728, DateTimeKind.Unspecified).AddTicks(6467), new TimeSpan(0, 7, 0, 0, 0))
                        });
                });

            modelBuilder.Entity("EW.Domain.Entities.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint");

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

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<long>("RoleId")
                        .HasColumnType("bigint");

                    b.Property<DateTimeOffset>("UpdatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("Users");
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

            modelBuilder.Entity("EW.Domain.Entities.Role", b =>
                {
                    b.Navigation("Users");
                });
#pragma warning restore 612, 618
        }
    }
}