# duckduckgo-demo-app
In order to run the App you have to perform three steps:
First: Clone Git repository to your local machine (and build solution).
Second: In terminal, go to ng-client section, run 'npm install'.
Third: Run .Net solution (by selecting appropriate command of menu or pressing F5).
After these three steps, tab with url: http://localhost:5001 will be opened (if not, feel free to open it by yourself) in order to use the App.
As well, url: http://localhost:5001/docs provides Swagger page (API description).
![image](https://user-images.githubusercontent.com/103916518/163771731-5f373b7b-9230-43b7-abd6-8ca7598aec30.png)

Overview:
The App has two sections - main section and sidebar.
Main section has 'Search' panel for submiting queries and panel below for results.
Results come as list of clickable items - click on it will open new tab with appropriate page of DuckDuckGo.
There is number of query appearances in results, placed right under the 'Search' bar, every appearance highlighted (yellow) as well.
On the right side of 'Search' bar there is switch, that toggles between 'Archive history' mode and 'Single session' mode.
'Archive history' mode means that every searched query stored on local drive (file) and all these queries will be present on left (sidebar) panel after restarting the App (in case of activation switch is ON). 'Single session' mode save the queries in context of current session (will be lost after App closed).
Left panel (side bar) has a list of clickable items that represents queries searched before. Click on it will populate 'Search' bar with appropriate query and its results will be shown.

![image](https://user-images.githubusercontent.com/103916518/163771891-15aefdff-2ae3-4dab-ae10-f0508d843946.png)

