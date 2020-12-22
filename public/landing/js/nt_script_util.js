function nt_addItem(e, t, n) {
    var r = new Option;
    r.text = t;
    r.value = n;
    document.getElementById(e).options.add(r)
}

function nt_rmItem(e) {
    var t = document.getElementById(e);
    var n = t.options[t.selectedIndex].text;
    var r = t.value;
    if (r != "") {
        var i = confirm("Bạn có muốn xóa '" + n + "' từ listbox không?");
        if (i == true) {
            t.options[t.selectedIndex] = null
        }
    } else alert("Chọn Item trong list trước khí xóa");
    return false
}

function collapse_expand(e) {
    var t = document.getElementById("collapseimg_" + e);
    var n = document.getElementById("collapseobj_" + e);
    if (t.alt == 1) {
        t.src = "../images/icons/button-up.gif";
        n.style.display = "none";
        t.alt = 0
    } else {
        t.src = "../images/icons/button-down.gif";
        t.alt = 1;
        n.style.display = ""
    }
}

function aspnetEncode(e) {
    e = replaceAll1("%", "%25", e);
    e = replaceAll(" ", "%20", e);
    e = replaceAll("@", "%40", e);
    e = replaceAll("#", "%23", e);
    e = replaceAll1("$", "%24", e);
    e = replaceAll1("^", "%5e", e);
    e = replaceAll("=", "%3d", e);
    e = replaceAll1("+", "%2b", e);
    e = replaceAll(":", "%3a", e);
    e = replaceAll(";", "%3b", e);
    e = replaceAll('"', "%22", e);
    e.replace(/\\/g, "%2b");
    e = replaceAll("/", "%2f", e);
    e = replaceAll1("?", "%3f", e);
    e = replaceAll("<", "%3c", e);
    e = replaceAll(">", "%3e", e);
    e = replaceAll1("[", "%5b", e);
    e = replaceAll("]", "%5d", e);
    e = replaceAll("{", "%7b", e);
    e = replaceAll("}", "%7d", e);
    e = replaceAll("`", "%60", e);
    return e
}

function replaceAll(e, t, n) {
    return n.replace(new RegExp(e, "g"), t)
}

function replaceAll1(e, t, n) {
    do {
        main = n;
        n = main.replace(e, t)
    } while (n != main);
    return n
}

function checkTime(e) {
    if (e < 10) {
        e = "0" + e
    }
    return e
}
var weekday = new Array(7);
weekday[0] = "Thứ hai";
weekday[1] = "Thứ ba";
weekday[2] = "Thứ tư";
weekday[3] = "Thứ năm";
weekday[4] = "Thứ sáu";
weekday[5] = "Thứ bảy";
weekday[6] = "Chủ nhật"