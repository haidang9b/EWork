namespace EW.Domain.Entities
{
    public class WorkHistory : History
    {
        public string CompanyName { get; set; }
        public bool IsWorking { get; set; }
    }
}
