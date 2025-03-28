const countries = [
    { id: 1, name: "Afghanistan", flag: "https://flagcdn.com/w320/af.png", continent: "Asia" },
    { id: 2, name: "Albania", flag: "https://flagcdn.com/w320/al.png", continent: "Europe" },
    { id: 3, name: "Algeria", flag: "https://flagcdn.com/w320/dz.png", continent: "Africa" },
    { id: 4, name: "Andorra", flag: "https://flagcdn.com/w320/ad.png", continent: "Europe" },
    { id: 5, name: "Angola", flag: "https://flagcdn.com/w320/ao.png", continent: "Africa" },
    { id: 6, name: "Antigua and Barbuda", flag: "https://flagcdn.com/w320/ag.png", continent: "North America" },
    { id: 7, name: "Argentina", flag: "https://flagcdn.com/w320/ar.png", continent: "South America" },
    { id: 8, name: "Armenia", flag: "https://flagcdn.com/w320/am.png", continent: "Asia" },
    { id: 9, name: "Australia", flag: "https://flagcdn.com/w320/au.png", continent: "Oceania" },
    { id: 10, name: "Austria", flag: "https://flagcdn.com/w320/at.png", continent: "Europe" },
    { id: 11, name: "Azerbaijan", flag: "https://flagcdn.com/w320/az.png", continent: "Asia" },
    { id: 12, name: "Bahamas", flag: "https://flagcdn.com/w320/bs.png", continent: "North America" },
    { id: 13, name: "Bahrain", flag: "https://flagcdn.com/w320/bh.png", continent: "Asia" },
    { id: 14, name: "Bangladesh", flag: "https://flagcdn.com/w320/bd.png", continent: "Asia" },
    { id: 15, name: "Barbados", flag: "https://flagcdn.com/w320/bb.png", continent: "North America" },
    { id: 16, name: "Belarus", flag: "https://flagcdn.com/w320/by.png", continent: "Europe" },
    { id: 17, name: "Belgium", flag: "https://flagcdn.com/w320/be.png", continent: "Europe" },
    { id: 18, name: "Belize", flag: "https://flagcdn.com/w320/bz.png", continent: "North America" },
    { id: 19, name: "Benin", flag: "https://flagcdn.com/w320/bj.png", continent: "Africa" },
    { id: 20, name: "Bhutan", flag: "https://flagcdn.com/w320/bt.png", continent: "Asia" },
    { id: 21, name: "Bolivia", flag: "https://flagcdn.com/w320/bo.png", continent: "South America" },
    { id: 22, name: "Bosnia and Herzegovina", flag: "https://flagcdn.com/w320/ba.png", continent: "Europe" },
    { id: 23, name: "Botswana", flag: "https://flagcdn.com/w320/bw.png", continent: "Africa" },
    { id: 24, name: "Brazil", flag: "https://flagcdn.com/w320/br.png", continent: "South America" },
    { id: 25, name: "Brunei", flag: "https://flagcdn.com/w320/bn.png", continent: "Asia" },
    { id: 26, name: "Bulgaria", flag: "https://flagcdn.com/w320/bg.png", continent: "Europe" },
    { id: 27, name: "Burkina Faso", flag: "https://flagcdn.com/w320/bf.png", continent: "Africa" },
    { id: 28, name: "Burundi", flag: "https://flagcdn.com/w320/bi.png", continent: "Africa" },
    { id: 29, name: "Cabo Verde", flag: "https://flagcdn.com/w320/cv.png", continent: "Africa" },
    { id: 30, name: "Cambodia", flag: "https://flagcdn.com/w320/kh.png", continent: "Asia" },
    { id: 31, name: "Cameroon", flag: "https://flagcdn.com/w320/cm.png", continent: "Africa" },
    { id: 32, name: "Canada", flag: "https://flagcdn.com/w320/ca.png", continent: "North America" },
    { id: 33, name: "Central African Republic", flag: "https://flagcdn.com/w320/cf.png", continent: "Africa" },
    { id: 34, name: "Chad", flag: "https://flagcdn.com/w320/td.png", continent: "Africa" },
    { id: 35, name: "Chile", flag: "https://flagcdn.com/w320/cl.png", continent: "South America" },
    { id: 36, name: "China", flag: "https://flagcdn.com/w320/cn.png", continent: "Asia" },
    { id: 37, name: "Colombia", flag: "https://flagcdn.com/w320/co.png", continent: "South America" },
    { id: 38, name: "Comoros", flag: "https://flagcdn.com/w320/km.png", continent: "Africa" },
    { id: 39, name: "Congo (Republic)", flag: "https://flagcdn.com/w320/cg.png", continent: "Africa" },
    { id: 40, name: "Congo (Democratic Republic)", flag: "https://flagcdn.com/w320/cd.png", continent: "Africa" },
    { id: 41, name: "Costa Rica", flag: "https://flagcdn.com/w320/cr.png", continent: "North America" },
    { id: 42, name: "Croatia", flag: "https://flagcdn.com/w320/hr.png", continent: "Europe" },
    { id: 43, name: "Cuba", flag: "https://flagcdn.com/w320/cu.png", continent: "North America" },
    { id: 44, name: "Cyprus", flag: "https://flagcdn.com/w320/cy.png", continent: "Asia" },
    { id: 45, name: "Czech Republic", flag: "https://flagcdn.com/w320/cz.png", continent: "Europe" },
    { id: 46, name: "Denmark", flag: "https://flagcdn.com/w320/dk.png", continent: "Europe" },
    { id: 47, name: "Djibouti", flag: "https://flagcdn.com/w320/dj.png", continent: "Africa" },
    { id: 48, name: "Dominica", flag: "https://flagcdn.com/w320/dm.png", continent: "North America" },
    { id: 49, name: "Dominican Republic", flag: "https://flagcdn.com/w320/do.png", continent: "North America" },
    { id: 50, name: "Ecuador", flag: "https://flagcdn.com/w320/ec.png", continent: "South America" },
    { id: 51, name: "Egypt", flag: "https://flagcdn.com/w320/eg.png", continent: "Africa" },
    { id: 52, name: "El Salvador", flag: "https://flagcdn.com/w320/sv.png", continent: "North America" },
    { id: 53, name: "Equatorial Guinea", flag: "https://flagcdn.com/w320/gq.png", continent: "Africa" },
    { id: 54, name: "Eritrea", flag: "https://flagcdn.com/w320/er.png", continent: "Africa" },
    { id: 55, name: "Estonia", flag: "https://flagcdn.com/w320/ee.png", continent: "Europe" },
    { id: 56, name: "Eswatini", flag: "https://flagcdn.com/w320/sz.png", continent: "Africa" },
    { id: 57, name: "Ethiopia", flag: "https://flagcdn.com/w320/et.png", continent: "Africa" },
    { id: 58, name: "Fiji", flag: "https://flagcdn.com/w320/fj.png", continent: "Oceania" },
    { id: 59, name: "Finland", flag: "https://flagcdn.com/w320/fi.png", continent: "Europe" },
    { id: 60, name: "France", flag: "https://flagcdn.com/w320/fr.png", continent: "Europe" },
    { id: 61, name: "Gabon", flag: "https://flagcdn.com/w320/ga.png", continent: "Africa" },
    { id: 62, name: "Gambia", flag: "https://flagcdn.com/w320/gm.png", continent: "Africa" },
    { id: 63, name: "Georgia", flag: "https://flagcdn.com/w320/ge.png", continent: "Asia" },
    { id: 64, name: "Germany", flag: "https://flagcdn.com/w320/de.png", continent: "Europe" },
    { id: 65, name: "Ghana", flag: "https://flagcdn.com/w320/gh.png", continent: "Africa" },
    { id: 66, name: "Greece", flag: "https://flagcdn.com/w320/gr.png", continent: "Europe" },
    { id: 67, name: "Grenada", flag: "https://flagcdn.com/w320/gd.png", continent: "North America" },
    { id: 68, name: "Guatemala", flag: "https://flagcdn.com/w320/gt.png", continent: "North America" },
    { id: 69, name: "Guinea", flag: "https://flagcdn.com/w320/gn.png", continent: "Africa" },
    { id: 70, name: "Guinea-Bissau", flag: "https://flagcdn.com/w320/gw.png", continent: "Africa" },
    { id: 71, name: "Guyana", flag: "https://flagcdn.com/w320/gy.png", continent: "South America" },
    { id: 72, name: "Haiti", flag: "https://flagcdn.com/w320/ht.png", continent: "North America" },
    { id: 73, name: "Honduras", flag: "https://flagcdn.com/w320/hn.png", continent: "North America" },
    { id: 74, name: "Hungary", flag: "https://flagcdn.com/w320/hu.png", continent: "Europe" },
    { id: 75, name: "Iceland", flag: "https://flagcdn.com/w320/is.png", continent: "Europe" },
    { id: 76, name: "India", flag: "https://flagcdn.com/w320/in.png", continent: "Asia" },
    { id: 77, name: "Indonesia", flag: "https://flagcdn.com/w320/id.png", continent: "Asia" },
    { id: 78, name: "Iran", flag: "https://flagcdn.com/w320/ir.png", continent: "Asia" },
    { id: 79, name: "Iraq", flag: "https://flagcdn.com/w320/iq.png", continent: "Asia" },
    { id: 80, name: "Ireland", flag: "https://flagcdn.com/w320/ie.png", continent: "Europe" }
]
    