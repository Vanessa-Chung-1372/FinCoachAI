"use client";
import { useState } from "react";
import axios from "axios";

export default function Chatbot() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch chatbot data from API route
      const res = [
        {
          "video_title": "How to Invest for Beginners (2025)",
          "youtube_link": "https://www.youtube.com/watch?v=lNdOtlpmH5U",
          "summary": "**Video Title:** The Ultimate Guide to Investing For Beginners\n**YouTuber:** Ali Abdaal\n\n**Summary:**\n\nAli Abdaal's video guides beginners on investing, outlining actionable steps to take. He emphasizes that investing aims to grow your money to combat inflation. He advises against individual stock picking for beginners, recommending instead to invest in an S&P 500 index fund (or similar fund in your country) which diversifies investments across a broad range of top companies. This approach tracks the market's performance without requiring specialized knowledge.\n\nTo get started, viewers should find a reputable online investment platform in their country (e.g., Charles Stanley Direct or Vanguard). He personally uses Trading 212 (and sponsors the video) which he recommends because they have a practice feature, and a \"pies\" feature where you can see other investor portfolios. He also addresses common fears of losing money by re-iterating the fact that the stock market generally goes up over time.\n\nThe video also discusses \"fast lane investing,\" an alternative to the \"slow lane\" of traditional investing. This involves investing in yourself and your own business to generate higher returns (e.g., a course to improve skills or starting a business). The returns on these endeavours are more likely to be higher than those of the S&P 500.\n"
        },
        {
          "video_title": "Investing for Beginners - How I Make Millions from Stocks (Full Guide)",
          "youtube_link": "https://www.youtube.com/watch?v=8Ij7A1VCB7I",
          "summary": "**Video Title:** \"How to Invest in Stocks (for Beginners)\"\n**YouTuber:** Mark Tilbury\n\nMark Tilbury explains how to start investing in stocks, particularly for beginners, using a phone app.\n\n**Actionable Steps:**\n\n1.  **Open a Tax-Advantaged Investment Account:** Use a platform like Trading 212 (others are available). Open a stocks and shares ISA (UK) or Roth IRA (US) for tax benefits. Use code \"Tilbury\" for a free stock worth up to £100 if using Trading 212, and invite friends for more free shares.\n2.  **Deposit Funds:** Deposit money into the account using various options such as bank transfer, debit card, or Apple Pay. Start with an amount you're comfortable with.\n3.  **Automate Investing in Index Funds:** Invest in an S&P 500 index fund for diversification. Set up a recurring investment (e.g., £5 daily) to automate the process and benefit from dollar-cost averaging. Opt for an accumulation fund to reinvest dividends automatically.\n4.  **Consider Individual Stocks (with Caution):** While not recommended for beginners, research companies using fundamental analysis (financials, management, brand). Use limit orders to buy stocks at your desired price.\n\nKey takeaway: Start investing early, diversify with index funds, and automate the process.\n\n"
        },
        {
          "video_title": "How to Invest for Beginners in 2025",
          "youtube_link": "https://www.youtube.com/watch?v=Ay4fmZdZqJE",
          "summary": "**Video Title:** \"What's the Best Way For Beginners to Start Investing Online With Just $100?\"\n**YouTuber:** Tilbury\n\n**Summary:**\nTilbury explores five investment options for beginners with $100, evaluating them based on learning curve, passive income potential, tax efficiency, risk level, and four-year results.\n\n**Actionable Steps:**\n\n1.  **Individual Stocks:** Use a demo account on platforms like Trading 212 to practice stock trading without risking real money. If in the UK, utilize a Stocks and Shares ISA to shield profits from taxes.\n2.  **REITs (Real Estate Investment Trusts):** Research REITs that align with your risk tolerance. Consider holding them in a tax-advantaged account like a Stocks and Shares ISA (UK) for tax benefits.\n3.  **Cryptocurrency:** Open a secure crypto wallet (hardware wallets are safest). Choose a trustworthy exchange like Coinbase or Binance. Start with Bitcoin or Ethereum due to their relative stability. Be cautious of scams and high volatility.\n4.  **Gold:** Consider buying physical gold coins or investing in gold ETFs (exchange-traded funds) through platforms like Trading 212.\n5.  **Index Funds:** Invest in low-cost index funds like the S&P 500 through platforms like Trading 212 for diversified, long-term growth. Utilize tax-advantaged accounts such as Stocks and Shares ISAs (UK) or Roth IRAs (USA) for optimal tax efficiency.\n\nTilbury recommends starting early, even with small amounts, to benefit from compounding. He diversifies his portfolio across these investment types to balance growth, stability, and risk.\n"
        },
        {
          "video_title": "Can ChatGPT Answer Complex Investing and Retirement Questions? Let&#39;s Find Out.",
          "youtube_link": "https://www.youtube.com/watch?v=EUDgo5T7wBQ",
          "summary": "**Video Title:** Asking Chat GPT Tough Investing & Retirement Questions!\n**YouTuber:** Rob Berger\n\n**Summary:**\n\nIn this video, Rob Berger explores how effectively the AI program ChatGPT answers tough investing and retirement questions. While acknowledging it's not perfect, he highlights its ability to give surprisingly good answers, noting it predicts the next word in a sequence rather than searching the internet.\n\n**Actionable Steps:**\n\n1.  **Use ChatGPT for Research:** Berger suggests using ChatGPT as a research tool to gain information on investing and retirement concepts and strategies.\n2.  **Ask Specific Questions:** The video shows ChatGPT answering questions about portfolio construction and retirement planning. Try asking it your own specific questions for personalized insights.\n3.  **Verify the Information:** Be aware that while ChatGPT provides helpful information, it may not always be accurate. It's crucial to verify the data and recommendations it provides through other sources and consulting with a financial professional.\n4.  **Experiment with Different Prompts:** The video demonstrates various types of questions you can ask ChatGPT. Experiment with different prompts to get the most useful information.\n"
        },
        {
          "video_title": "Build a Dynamic 3 Statement Financial Model From Scratch",
          "youtube_link": "https://www.youtube.com/watch?v=66WChsYJ8C4",
          "summary": "**Video Title:** \"Create a Dynamic Three Statement Model\"\n\n**YouTuber:** Kenji\n\n**Summary:**\n\nKenji's video guides viewers in building a dynamic three-statement financial model (income statement, balance sheet, and cash flow statement) in Excel, using a lemonade stand company as an example.\n\n**Actionable steps:**\n\n1.  **Download the Excel file:** Get the free template from the description.\n2.  **Organize the Income Statement:** Set up years and format sections for revenue, costs, and expenses. Input assumptions (revenue, costs, expenses). Link revenue to assumptions for dynamic calculations.\n3.  **Create Schedules:** Develop schedules for fixed assets (lemon crusher, ice machine, etc.) and calculate depreciation for each asset over its useful life.\n4.  **Build the Balance Sheet:** Input historical data, link to the income statement and fixed asset schedule, and establish assumptions for items like accounts receivable and payable based on a percentage of revenue/COGS.\n5.  **Construct the Cash Flow Statement:** Link net income from the income statement, add back non-cash expenses (depreciation), adjust for changes in working capital (accounts receivable/payable), and incorporate investing (capital expenditures) and financing activities (debt/borrowing).\n6.  **Link the Statements:** Interlink the three statements. Pay attention to the Excel formulas used, ensuring accuracy to achieve a balanced balance sheet.\n"
        },
        {
          "video_title": "Cash App Bitcoin Warning - Watch Before Buying Bitcoin on Cash App",
          "youtube_link": "https://www.youtube.com/watch?v=OzRRWKLL4Gs",
          "summary": "**Video Title:** Don't Buy Bitcoin on Cash App Until You Watch This!\n\n**YouTuber:** Dennis\n\n**Summary:**\n\nBefore buying Bitcoin on Cash App, understand how it works to avoid unexpected costs. First, navigate to the Bitcoin section within the Cash App (link in description). Cash App provides news articles to learn about Bitcoin. When buying, be aware of fees. Dennis demonstrates that even a small $1 purchase incurs fees (3 cents in his example). These fees, though seemingly small, add up, especially with larger transactions. Selling Bitcoin also incurs fees. Bitcoin's price on Cash App is volatile. Consider that buying and selling both cost money.\n"
        },
        {
          "video_title": "Robert Kiyosaki: The Best Investment Strategy in the World 🔥📈 #money #investing #finance",
          "youtube_link": "https://www.youtube.com/watch?v=AIOWO943HtM",
          "summary": "**YouTube Video Title:** N/A (This transcript is likely a snippet from a larger video)\n**YouTuber:** N/A\n\n**Summary:**\n\nThis video snippet features an entrepreneur discussing their investment strategy and answering a question about investing in oil. Instead of recommending traditional oil investments like stocks or ETFs, the speaker emphasizes investing in tangible assets and businesses. Their actionable advice centers around adopting an entrepreneurial mindset:\n\n*   **Invest in Assets You Control:** Focus on starting or investing in businesses that generate tangible assets (like gold mines, oil wells, or cattle) rather than relying on financial instruments.\n*   **Prioritize Cash Flow:** Choose investments that produce consistent cash flow, such as cattle breeding, where each offspring generates revenue.\n*   **Trust Tangible Value:** The speaker implies a preference for investments with inherent, demonstrable value (like the wagyu cattle) over those susceptible to inflationary or policy-driven pressures. The main takeaway is to become a producer and own assets rather than simply being a consumer of investment products.\n"
        },
        {
          "video_title": "Robert Kiyosaki: This is the Best Investment Now!🔥📈 #money #investing #finance #robertkiyosaki",
          "youtube_link": "https://www.youtube.com/watch?v=A1MkGsIY-NQ",
          "summary": "Okay, based on the provided transcript, the key information about the video is missing (title and YouTuber name). However, I can infer some actionable steps based on the content, though they are vague and might not be fully representative of the video's intent.\n\n**Inferred Actionable Steps Summary:**\n\nThe video, presumably about investing, centers around the perceived value of pre-1964 silver coins. The YouTuber suggests that these coins, specifically silver \"Little Women\" coins (likely a colloquial term), hold intrinsic value beyond their face value due to their silver content.\n\nActionable steps viewers might take include:\n\n1.  **Identify and acquire pre-1964 US silver coinage:** Research which US coins minted before 1964 contain silver (dimes, quarters, half dollars).\n2.  **Assess the value of silver coins:** Determine the current market value of silver. Compare to current value.\n3.  **Numismatic Value:** Research if particular coins have high collector's value that exceeds the inherent silver value.\n4.  **Consider investing in silver coins:** Based on your research and risk tolerance, consider accumulating these coins as a potential investment.\n"
        },
        {
          "video_title": "Dave Explains Why He Doesn&#39;t Recommend Bonds",
          "youtube_link": "https://www.youtube.com/watch?v=iRtFDvGORQk",
          "summary": "**Video Title:** \"[Not Provided - Please add title]\"\n**YouTuber:** Dave Ramsey\n\n**Summary:**\n\nIn this video, Dave Ramsey argues against the traditional financial advice of shifting investments towards bonds as you age. He emphasizes that the bond market isn't significantly less volatile than the stock market and doesn't perform as well over time.\n\n**Actionable steps:**\n\n1.  **Re-evaluate Bond Holdings:** If you currently hold bonds as a significant part of your investment portfolio, particularly in a rising interest rate environment, consider re-evaluating their performance and potential for future growth.\n2.  **Consider Growth Stock Mutual Funds:** Instead of bonds, explore investing in growth stock mutual funds for long-term growth potential.\n3.  **Understand Bond Basics:** Familiarize yourself with how bonds work, particularly the inverse relationship between interest rates and bond values. Rising interest rates decrease bond values.\n4.  **Balanced Funds:** if you prefer a safer calmer approach invest in balanced stock mutual funds, but realize they hold less and less bonds in a rising interest rate environment.\n"
        }
  ];

      setResponse(res);

      // if (res.data && Array.isArray(res.data)) {
      //   setResponse(res.data); // ✅ Store array of objects
      // } else {
      //   setResponse([{ video_title: "No response received", youtube_link: "", summary: "" }]);
      // }
    } catch (error) {
      console.error("Chatbot API error:", error);
      setResponse([{ video_title: "Error fetching response", youtube_link: "", summary: "" }]);
    }
  };

  return (
    <div>
      <h1>AI Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask a financial question..."
        />
        <button type="submit">Ask</button>
      </form>

      <div>
        <h3>Response:</h3>
        {response.length > 0 ? (
          <ul>
            {response.map((item, index) => (
              <li key={index}>
                <h4>{item.video_title}</h4>
                <p>{item.summary}</p>
                {item.youtube_link && (
                  <a href={item.youtube_link} target="_blank" rel="noopener noreferrer">
                    Watch Video
                  </a>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No videos found.</p>
        )}
      </div>
    </div>
  );
}
