(function(win){
    win.prob_per_page = 30;
    win.WriteProbinfo = function(data,Probname,Probid){
        let ProbinfoBlock=win.createElement('tr');
            let Probinfo_id=win.createElement('th');
            let Probinfo_id_p=win.createElement('p');
            Probinfo_id_p.textContent=Probid;
            Probinfo_id.appendChild(Probinfo_id_p);
        ProbinfoBlock.appendChild(Probinfo_id);
            let Probinfo_name=win.createElement('th');
            let Probinfo_name_a=win.createElement('a');
            Probinfo_name_a.href='/xjoi/probs/'+Probname+'/'+Probname+'.html';
            Probinfo_name_a.textContent=win.prob_list[Probname];
            Probinfo_name.appendChild(Probinfo_name_a);
        ProbinfoBlock.appendChild(Probinfo_name);
            let Probinfo_path=win.createElement('th');
            let Probinfo_path_p=win.createElement('p');
            Probinfo_path_p.textContent=Probname;
            Probinfo_path.appendChild(Probinfo_path_p);
        ProbinfoBlock.appendChild(Probinfo_path);
        data.appendChild(ProbinfoBlock);
    }
    win.isLegalProb = function(Probname,prob_count){
        prob_count.value=prob_count.value+1;
        if(prob_count.value<=win.Page*win.prob_per_page) return 0;
        if(prob_count.value>(win.Page+1)*win.prob_per_page) return 0;
        return 1;
    }
    win.prob_count={value : 0};
    win.WriteProblemSet = function(data){
        let ProblemSetBlock = win.createElement('center');
        let ProblemSetTable = win.createElement('table');
        ProblemSetTable.border='1';ProblemSetTable.rules='all';ProblemSetTable.style='width: 70%';
            let ProblemSetTitle = win.createElement('tr');
                let Titleh0=win.createElement('th');
                Titleh0.style='width: 10%';
                Titleh0.appendChild(win.createTextNode('编号'));
            ProblemSetTitle.appendChild(Titleh0);
                let Titleh1=win.createElement('th');
                Titleh1.style='width: 50%';
                Titleh1.appendChild(win.createTextNode('标题'));
            ProblemSetTitle.appendChild(Titleh1);
                let Titleh2=win.createElement('th');
                Titleh2.style='width: 40%';
                Titleh2.appendChild(win.createTextNode('目录名'));
            ProblemSetTitle.appendChild(Titleh2);
        ProblemSetTable.appendChild(ProblemSetTitle);
        for(var Probname in win.prob_list)
            if(win.isLegalProb(Probname,win.prob_count))
                win.WriteProbinfo(ProblemSetTable,Probname,win.prob_count.value);
        ProblemSetBlock.appendChild(ProblemSetTable);
        data.appendChild(ProblemSetBlock);
    }
})(document);